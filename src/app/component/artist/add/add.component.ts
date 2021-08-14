import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from "@angular/router";

import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { ArtistService } from '@app/service/artist.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent implements OnInit {
  artistForm: FormGroup;

  artist = {
    artistName: "",
    albumName: "",
    imageURL: "",
    releaseDate: "",
    price: "",
    sampleURL: ""
  };

  constructor(private fb: FormBuilder, private artistService: ArtistService, private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(): void{
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

    const data = {
      artistName: this.artist.artistName,
      albumName: this.artist.albumName,
      imageURL: this.artist.imageURL,
      releaseDate: this.artist.releaseDate,
      price: this.artist.price,
      sampleURL: this.artist.sampleURL
    }

    this.artistService.create(data).subscribe(response => {
      console.log(response);
      this.router.navigate(["home"]);
    }, err => {
      console.log(err);
    })
  }

}
