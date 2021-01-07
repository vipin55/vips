import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { Login } from '../core/models/login';
import { TEST_USER } from '../core/services/user.service';
import { reducer } from '../store/reducers/root-reducers';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/takeWhile';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let page: Page;
  let login: Login = new Login();

  beforeEach(() => {
    login = TEST_USER;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, StoreModule.forRoot(reducer)],
      providers: [
        { provide: Store, useClass: Store },
        FormBuilder
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
  });

  beforeEach(() => {
    page = new Page(component, fixture);
    fixture.whenStable().then(() => {
      page.addPageElements();
    });
  });

  it(`should have as text 'User Login'`, () => {
    expect(component.title).toEqual('User Login');
  });

  it(`should have as boolean 'false'`, () => {
    expect(component.submitted).toEqual(false);
  });

  it('should create a FormGroup comprised of FormControls', () => {
    fixture.detectChanges();
    expect(component.loginForm instanceof FormGroup).toBe(true);
  });

  it('should authenticate', () => {
    fixture.detectChanges();

    component.loginForm.controls.email.setValue(login.email);
    component.loginForm.controls.password.setValue(login.password);

    component.onSubmit();

    expect(page.navigateSpy.calls.any()).toBe(true, 'Store.dispatch not invoked');
  });

  it('email field validity', () => {
    fixture.detectChanges();
    const email = component.loginForm.controls.email;
    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();

    email.setValue('test');
    expect(email.hasError('required')).toBeFalsy();
    expect(email.hasError('email')).toBeTruthy();
  });

  it('should render the MTN logo', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.avatar>img').src).toContain('/assets/mtnLogo.png');
  });
});
class Page {

  public emailInput: HTMLInputElement;
  public navigateSpy: jasmine.Spy;
  public passwordInput: HTMLInputElement;

  constructor(private component: LoginComponent, private fixture: ComponentFixture<LoginComponent>) {
    const injector = fixture.debugElement.injector;
    const store = injector.get(Store);

    this.navigateSpy = spyOn(store, 'dispatch');
  }

  public addPageElements(): any {
    const emailInputSelector = 'input[formcontrolname=\'email\']';
    this.emailInput = this.fixture.debugElement.query(By.css(emailInputSelector)).nativeElement;

    const passwordInputSelector = 'input[formcontrolname=\'password\']';
    this.passwordInput = this.fixture.debugElement.query(By.css(passwordInputSelector)).nativeElement;
  }
}
