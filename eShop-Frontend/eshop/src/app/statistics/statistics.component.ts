import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Statistics } from '../dtos/statistics';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  statistics: Statistics;
  isLoading: boolean = true;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchStatistics();
  }

  private fetchStatistics(): void {
    this.adminService.getStatistics().subscribe((data: Statistics) => {
      this.statistics = data;
      this.isLoading = false;
    }, error => {
      console.error('Error fetching statistics:', error);
      this.isLoading = false;
    });
  }
}
