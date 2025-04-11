import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent {
  text: string = '';
  result: any = null;
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  analyzeSentiment() {
    this.loading = true;
    this.http.post<any>('http://localhost:8000/analyze_sentiment/', { text: this.text })
      .subscribe({
        next: data => {
          this.result = data;
          this.loading = false;
        },
        error: err => {
          console.error('Error:', err);
          this.loading = false;
        }
      });
  }
}
