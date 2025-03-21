import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../../services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../models/member.model';

@Component({
    selector: 'app-member-details',
    standalone: true,
    imports: [],
    templateUrl: './member-details.component.html',
    styleUrl: './member-details.component.css'
})
export class MemberDetailsComponent implements OnInit{
  private memberService = inject(MemberService)
  private route = inject(ActivatedRoute)
  images: string[] = []

  member?: Member

  ngOnInit(): void {
    this.loadMember()
  }

  loadMember() {
    const userName = this.route.snapshot.paramMap.get('username')
    if (!userName) return;

    this.memberService.getUserByUserName(userName).subscribe({
      next: res =>{ 
        this.member = res?.result
        if (this.member?.photos) {
          this.images = this.member.photos.map((photo) => photo.url);
        }
      }
    })
  }

}
