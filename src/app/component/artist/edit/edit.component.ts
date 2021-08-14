import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from "@angular/router";

import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { ArtistService } from '@app/service/artist.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {
  artistForm: FormGroup;
  artist = {
    artistName: "",
    albumName: "",
    imageURL: "",
    releaseDate: "",
    price: "",
    sampleURL: ""
  }

  constructor(private fb: FormBuilder, private artistService: ArtistService, private route: ActivatedRoute, private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getArtist(this.route.snapshot.paramMap.get('id'));
  }

  getArtist(id): void {
    this.artistService.get(id).subscribe(data => {
      this.artist = data;
      this.artist.releaseDate = this.artist.releaseDate.substring(0,10);
      console.log(this.artist);
    },
    error => {
      console.log(error);
    });
  }

  createForm(): void {
    const dateRegex = "^((?:19|20)\\d\\d)-(0?[1-9]|1[012])-([12][0-9]|3[01]|0?[1-9])$";
    const priceRegex = "^-?[0-9]\\d{1,10}(\\.\\d{1,4})?";

    this.artistForm = this.fb.group({
      artistName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      albumName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      imageURL: ['', [Validators.maxLength(200)]],
      releaseDate: ['', [Validators.required, Validators.pattern(dateRegex)]],
      price: ['', [Validators.required,, Validators.pattern(priceRegex)]],
      sampleURL: ['', [Validators.maxLength(200)]],
    });

  }

  saveArtist(): void {
    if (!this.artistForm.valid) {
      this.artistForm.markAllAsTouched();
      return;
    }

    this.artist.price = this.artist.price.toString();
    console.log(this.artist)
    this.artistService.update(this.route.snapshot.paramMap.get('id'), this.artist).subscribe(response => {
      console.log(response);
      this.router.navigate(["home"]);
    }, err => {
      console.log(err);
    })
  }

}
