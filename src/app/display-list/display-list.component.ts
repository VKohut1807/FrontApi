import { Component, OnInit } from '@angular/core';
import { Message } from './messageModel' ;
import { NgForm } from '@angular/forms';
import { MessageService } from '../services/message.service';

@Component({ templateUrl: 'display-list.component.html',
  styleUrls: ['./display-list.component.css'] 
})
// @Component({
//   selector: 'app-display-list',
//   templateUrl: './display-list.component.html',
//   styleUrls: ['./display-list.component.css']
// })
export class DisplayListComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  private messageList: Message[] ;
  private isVisible: boolean = false ;
  private updatingId: any ;

  ngOnInit() {
    this.messageService.getMessages().subscribe(mess => {
      mess.forEach(item => item.isEdit = false) ;
      this.messageList = mess; } ) ;
   }

  onUpdate(form: NgForm) {
      this.messageList.forEach((item: Message) => {
        if (item._id === this.updatingId) {
          item.message = form.value.newMess ;
          this.messageService.updateMessage(item).subscribe() ; }
        });
  }

  showUpdateForm(mess: Message) {
    if(this.updatingId === mess._id) {
      this.isVisible = !this.isVisible;
    } else if ( this.isVisible === true ) {
      this.updatingId = mess._id ;
    } else {
      this.updatingId = mess._id ;
      this.isVisible = true;
    }
  }

  onDelete(mess) {
    // delete on page
    this.messageList = this.messageList.filter(item => item !== mess) ;

    // delete in database
    this.messageService.deleteMessage(mess).subscribe() ;
  }

  onSubmit(f: NgForm) {
    const newMessage: Message = {
      message: f.value.newMess
    };
    this.messageService.saveMessage(newMessage)
      .subscribe( (item: Message) => this.messageList.push(item) ) ;
  }

}
