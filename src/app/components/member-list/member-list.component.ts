import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member.model';
import { MemberCardComponent } from "./member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  memberService = inject(MemberService)
  members?: Member[]  = []
  ngOnInit(): void {
    this.loadMembers()
  }

  loadMembers() {
    this.memberService.getUsers().subscribe({
      next: (res) =>  this.members = res?.result
    })
  }
}
