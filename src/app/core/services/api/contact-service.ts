import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ContactService {
    private readonly apiUrl = 'https://sfo.cloud.appwrite.io/v1/functions/sendEmail/executions';

    constructor(private http: HttpClient) { }

    sendEmail(data: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Appwrite-Project': 'send-email'
        });
        return this.http.post(this.apiUrl, { body: JSON.stringify(data) }, { headers });
    }
}