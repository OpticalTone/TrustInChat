import {Component} from '@angular/core';

@Component({
	selector: 'chat-homepage',
	template: `
		<section class="col-md-8 col-md-offset-2">
			<form>
				<div class="form-group">
		            <label for="toEmail">To e-mail:<br>
		            (optional)</label>
		            <input type="text" id="toEmail" name="toEmail" class="form-control">
		        </div>
		        <div class="form-group">
		            <label for="fromName">From name:</label>
		            <input type="text" id="fromName" name="fromName" class="form-control">
		        </div>
		        <div class="form-group">
		            <label for="fromEmail">From e-mail:<br>
		            (optional)</label>
		            <input type="text" id="fromEmail" name="fromEmail" class="form-control">
		        </div>
		        <div class="form-group">
		            <label for="securityQuestion">Security question:</label>
		            <select id="securityQuestion" name="securityQuestion">
		                <option>Where did we first meet?</option>
		            </select>
		        </div>
		        <div class="form-group">
		            <label for="securityAnswer">Security answer:<br>
		            (minimum 4 characters)</label>
		            <input type="password" id="securityAnswer" name="securityAnswer" class="form-control">
		        </div>
		        <div class="form-group">
		            <label for="securityAnswerRep">Security answer:<br>
		            (repeated)</label>
		            <input type="password" id="securityAnswerRep" name="securityAnswerRep" class="form-control">
		        </div>
		        <div class="form-group">
		        	<label for="content">Initial message:</label>
		            <textarea id="content" name="content"></textarea>
		        </div>
		        <div class="form-group">
		            <input type="checkbox" name="notifications" value="notifications">Please send me update notifications about the TrustInChat service.**                                      
		        </div>
		        <div class="form-group">
		        	<button type="submit">SUBMIT</button>
		        </div>	
			</form>
		</section>
	`
})
export class HomepageComponent {

}