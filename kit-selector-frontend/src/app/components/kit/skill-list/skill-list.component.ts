import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Skill} from "../../../models/Skill";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Constants } from 'src/app/helper/Constants';
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent implements OnInit {
  @Input() skills: Array<Skill>;
  @Output() skillsChange = new EventEmitter<Array<Skill>>();
  displayedColumns = ["skillName", "skillLevel", "overridePlayerLevel", "skillActions"];
  newSkill: Skill = this.generateNewSkill();
  editingSkillIndex: number | undefined;
  filteredSkillList: Observable<string[]>;
  newSkillNameFormControl = new FormControl("");
  @ViewChild("skillTable")tableRef: MatTable<Skill>;

  constructor(private readonly snackbarService: MatSnackBar) { }

  ngOnInit(): void {
    this.filteredSkillList = this.newSkillNameFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return Constants.DefaultSkills.filter(option => option.toLowerCase().includes(filterValue));
  }

  generateNewSkill(): Skill {
    return {overridePlayerLevel: false, targetLevel: 1, name: ""};
  }

  addSkill(): void {
    if(this.skills == null){
      this.skills = [];
    }
    if(this.editingSkillIndex != undefined){
      this.saveEditedSkill(this.newSkill);
      return;
    }
    if(this.skills.some(skill => skill.name === this.newSkill.name)){
      this.snackbarService.open("Skill already exists.", "Close", {'duration': 3000})
      return;
    }
    this.skills.push(this.newSkill);
    this.newSkill = this.generateNewSkill();
    this.skillsChange.emit(this.skills);
    this.editingSkillIndex = undefined;
    this.tableRef.renderRows();
  }

  selectSkillForEdit(skill: Skill) {
    this.newSkill = {...skill};
    this.editingSkillIndex = this.skills.indexOf(skill);

  }

  saveEditedSkill(skill:Skill){
    if(this.editingSkillIndex == undefined){
      return;
    }
    let otherThanOriginalSkill = [...this.skills]
    otherThanOriginalSkill.splice(this.editingSkillIndex, 1)
    if(otherThanOriginalSkill.some(skill => skill.name === this.newSkill.name)){
      this.snackbarService.open("Skill already exists.", "Close", {'duration': 3000})
      return;
    }
    this.skills[this.editingSkillIndex] = skill;
    this.newSkill = this.generateNewSkill();
    this.skillsChange.emit(this.skills);
    this.editingSkillIndex = undefined;
    this.tableRef.renderRows();
  }

  deleteSkill(skill: Skill) {
    this.skills = this.skills.filter(s => s !== skill);
    this.skillsChange.emit(this.skills);
  }
}
