import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UndanganService } from 'src/app/services/undangan.service';

@Component({
  selector: 'app-buatundangan',
  templateUrl: './buatundangan.page.html',
  styleUrls: ['./buatundangan.page.scss'],
})
export class BuatundanganPage implements OnInit {

  // extract param 'text'
  embedLink: any;
  data: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private undangan: UndanganService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((param => {
      this.embedLink = param.text ? param.text.split("?")[0] + '?embed' : null;
      this.data = this.fb.group({
        canva_link: [param.text ? param.text.split("?")[0] + '?embed' : '', [Validators.required]], //view?embed && view?website
        title: ['', Validators.required],
        slug: ['', [Validators.required, this.noWhitespace]]
      })
    }));
  }

  async createUndangan() {
    this.undangan.create(this.data.value).subscribe(
      (res) => {
        console.log(res)
      }
    )
  }

  public noWhitespace(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }
}
