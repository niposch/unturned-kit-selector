import concurrent.futures.thread
import os
import pickle
import shutil
import urllib.request

from lxml import etree

from bs4 import BeautifulSoup
from requests import request
from selenium import webdriver
import dotenv
from os import environ

from selenium.webdriver.common.by import By
from item import Item
from tqdm import tqdm

dotenv.load_dotenv()
DRIVER_PATH = environ.get("SELENIUM_DRIVER_PATH")
driver = webdriver.Chrome(executable_path=DRIVER_PATH)

unturned_item_url = "https://unturnedhub.com/items"
image_url = "https://unturnedhub.com"

def download_item(item_url:str) -> Item | None:
    try:
        webpage = request(method="GET", url=item_url).text
        soup = BeautifulSoup(webpage, "html.parser")
        dom = etree.HTML(str(soup))
        item_id = int(dom.xpath("/html/body/div[2]/div/div[4]/div/div[3]/table/tbody/tr[1]/td[2]")[0].text)
        weight = 0.0
        try:
            weight = float(dom.xpath("/html/body/div[2]/div/div[4]/div/div[3]/table/tbody/tr[2]/td[2]")[0].text[:-2])
        except:
            print(f"failed to parse weight \"{weight}\"")

        type = dom.xpath("/html/body/div[2]/div/div[4]/div/div[3]/table/tbody/tr[3]/td[2]/a/span")[0].text
        rarity = dom.xpath("/html/body/div[2]/div/div[4]/div/div[3]/table/tbody/tr[4]/td[2]/a/span")[0].text
        horizontal_slots = int(dom.xpath("/html/body/div[2]/div/div[4]/div/div[3]/table/tbody/tr[5]/td[2]")[0].text)
        vertical_slots = int(dom.xpath("/html/body/div[2]/div/div[4]/div/div[3]/table/tbody/tr[6]/td[2]")[0].text)
        name = dom.xpath("/html/body/div[2]/div/div[1]/ol/li[last()]")[0].text
        description = dom.xpath("/html/body/div[2]/div/div[4]/div/div[3]/p")[0].text
        image_url = dom.xpath("/html/body/div[2]/div/div[4]/div/div[2]/img")[0].attrib["src"]
        item = Item(horizontal_slots, vertical_slots, item_id, weight, type, rarity, name, description, image_url)
        return item
    except:
        print(f"failed to download {item_url}")
        return None

def downloadImage(item:Item):
    url = image_url + item.thumbnail_url
    item_id = item.item_id
    try:
        urllib.request.urlretrieve(url, f"images/{item_id}.png")
    except:
        print(f"failed to download {url} of item #{item_id}")
        return None

item_urls = []


driver.get(unturned_item_url)
elements = driver.find_elements(By.XPATH, '//*[@id="table"]/tbody/tr/td[2]/a')

for element in tqdm(elements):
    item_urls.append(element.get_attribute("href"))

driver.close()

# if images folder exists delete it
if os.path.exists("images"):
    shutil.rmtree("images")

os.mkdir("images")

items = []
with concurrent.futures.thread.ThreadPoolExecutor(max_workers=20) as executor:
    items = list(tqdm(executor.map(lambda item_url: download_item(item_url), item_urls)))
    tqdm(executor.map(lambda item: downloadImage(item), items))

pickle.dump(items, open("items.p", "wb"))

print(item_urls)