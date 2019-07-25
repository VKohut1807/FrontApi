import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../display-list/messageModel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private url = 'api/messages';

  constructor(private http: HttpClient) { }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.url) ;
  }

  deleteMessage(mess: Message): Observable<Message> {
    const url = `${this.url}/${mess._id}` ;
    return this.http.delete<Message>(url) ;
  }

  saveMessage(mess: Message): Observable<Message> {
    return this.http.post<Message>(this.url, mess, httpOptions) ;
  }

  updateMessage(mess: Message): Observable<Message> {
    const url = `${this.url}/${mess._id}` ;
    return this.http.put<Message>(url, mess, ) ;
  }
}
