import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'oriontek-clients';

  constructor(private router: Router){}

  ngOnInit() {
    this.router.navigate(['/']);
  }
}
