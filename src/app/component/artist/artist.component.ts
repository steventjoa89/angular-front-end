import { Component, OnInit } from '@angular/core';

import { ModalService } from '../../_modal';

import { ArtistService } from '../../service/artist.service';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.less']
})
export class ArtistComponent implements OnInit {
  bodyText: string;
  artists: any;

  playMusic = {
    artistName: "",
    albumName: ""
  };

  constructor(private modalService: ModalService, private artistService: ArtistService) { }

  ngOnInit() {
    this.retrieveArtists();
    this.bodyText = 'This text can be updated in modal 1';
  }

  retrieveArtists(): void {
    this.artistService.getAll().subscribe(data => {
      this.artists = data;
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }

  deleteArtist(id: number): void {
    if(confirm("Are you sure to delete this artist? ")) {
      console.log(id);
      this.artistService.delete(id).subscribe(data => {
        console.log(data);
        let index = this.artists.findIndex((artist: any) => artist.artistId === id);
        this.artists.splice(index, 1);
      }, error => {
        console.log(error);
      })
    }
  }

  audioList = [
    {
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      title: "Smaple 1",
      cover: "https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg"
    }
  ]

  openModal(id: string, artistId: number) {
    console.log(artistId);

    const result = this.artists.filter(artist => artist.artistId == artistId);
    this.playMusic.artistName = result[0].artistName;
    this.playMusic.albumName = result[0].albumName;
    this.audioList[0].url = result[0].sampleURL;
    this.audioList[0].cover = result[0].imageURL;
    this.audioList[0].title = result[0].artistName;

    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
