import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { HomepageService } from './homepage.service';
import { ErrorService } from '../errors/error.service';

import { User } from './user.model';
import { Email } from './email.model';

@Component({
	selector: 'chat-homepage',
	template: `<h1>Homepage</h1>`
})
export class HomepageComponent implements OnInit {

	ngOnInit() {

	}
	
}