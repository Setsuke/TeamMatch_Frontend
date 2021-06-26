import { Component, OnInit } from '@angular/core';
import { HttpPlayerService } from '../../services/http-player.service';

@Component({
  selector: 'app-ranking-players',
  templateUrl: './ranking-players.component.html',
  styleUrls: ['./ranking-players.component.css']
})
export class RankingPlayersComponent implements OnInit {

  listPlayers: any[];
  listPlayersOrdered: any[];
  constructor(private httpPlayerService: HttpPlayerService) { }

  ngOnInit(): void {
    this.httpPlayerService.getPlayersList().subscribe((response : any) => {
      this.listPlayers = response.content;

      this.listPlayers.sort(function (a, b) {
        if (a.killDeathRatio > b.killDeathRatio) {
          return -1;
        }
        if (a.killDeathRatio < b.killDeathRatio) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });

    console.log(this.listPlayers)

    });
  }

}
