import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { Hero } from '../../../core/models/hero.model';
import { HeroService } from '../../../core/services/hero.service';
import { DialogData } from './../../../core/models/dialog-data.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'actions'];
  public heroes: Hero[] = [];

  constructor(private dialog: MatDialog, private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  public getHeroes(): void {
    this.heroService.getAll().subscribe((heroes) => (this.heroes = heroes));
  }

  public delete(hero: Hero): void {
    const dialogData: DialogData = {
      cancelText: 'Cancel',
      confirmText: 'Delete',
      content: `Delete: '${hero.name}'?`,
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData,
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroService.delete(hero).subscribe(() => {
          // atualiza a lista de heroes sem usar getHeroes
          this.heroes = this.heroes.filter((h) => h !== hero);
          // this.getHeroes();
        });
      }
    })

  }
}
