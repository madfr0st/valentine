
import { AfterViewInit, Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css'],
  imports: [BrowserAnimationsModule]
})
export class WallComponent implements OnInit, AfterViewInit {



  constructor(){
   
  }

  @ViewChild('backgroundMusic', { static: true }) audioRef!: ElementRef<HTMLAudioElement>;

  valentine_no_message: string[] = [
    "No? 🧐", 
    "Are you sureee? 😕", 
    "Really really sure?? 🙁", 
    "Are you absolutely positive? 😖", 
    "Pookie, please reconsider... 🥹", 
    "Just think about it one more time! 💭💕", 
    "If you say no, my heart will shatter... 💔", 
    "I will be very, very, very sad... 😢", 
    "Don't do this to me, my love! 😭", 
    "You're breaking my heart... 💘💥", 
    "I... I think I'm gonna cry... 🥺💔"
  ];

  noMessageIndex: number = 0;
  yesButtonExpanded: boolean = false;
  showHappyMessage: boolean = false;
  yesButtonHeight = 10;
  yesButtonWidth = 10;
  buttonContinerHeight = 20;
  buttonContainerWidth = 20;


  ngAfterViewInit(): void {
    const audio = this.audioRef.nativeElement;

    // Try playing automatically
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn('Autoplay prevented: ', error);
        document.addEventListener('click', () => {
          audio.play();
        }, { once: true });
      });
    }
  }
  its_Valentine_day = false;
  currentTime: Date = new Date();

  countdownTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  flipState = { days: false, hours: false, minutes: false, seconds: false };

  isHeartBeating = false;

  targetDate: Date = new Date('2025-02-14T00:00:00-06:00'); // Valentine's Day in Minneapolis time

  ngOnInit() {
    this.updateTime();
    this.calculateCountdown();

    setInterval(() => {
      this.updateTime();
      this.calculateCountdown();
    }, 1000);

    // Start heartbeat animation with delay
    setInterval(() => {
      this.isHeartBeating = true;
      setTimeout(() => {
        this.isHeartBeating = false;
      }, 1000);
    }, 3000); // Every 3 seconds, triggers animation for 1 second
  }

  updateTime() {
    // Get current time in Minneapolis timezone
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { timeZone: 'America/Chicago', hour12: false };
    const chicagoTime = new Intl.DateTimeFormat('en-US', options).format(now);

    this.currentTime = new Date(chicagoTime);
    console.log(this.currentTime)
    // Check if today is Valentine's Day
    this.its_Valentine_day = this.currentTime.getFullYear() === 2025 &&
      this.currentTime.getMonth() === 1 && // February (Month index is 0-based)
      this.currentTime.getDate() === 14;
  }

  calculateCountdown() {
    const now = new Date();
    const timeDiff = this.targetDate.getTime() - now.getTime();

    if (timeDiff > 0) {
      const newCountdown = {
        days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((timeDiff / (1000 * 60)) % 60),
        seconds: Math.floor((timeDiff / 1000) % 60),
      };

      // Flip only the changing numbers
      Object.keys(newCountdown).forEach((key) => {
        const unit = key as keyof typeof this.countdownTime;
        if (newCountdown[unit] !== this.countdownTime[unit]) {
          this.flipState[unit] = true;
          setTimeout(() => {
            this.flipState[unit] = false;
          }, 700);
        }
      });

      this.countdownTime = newCountdown;
    } else {
      this.countdownTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }

  onNoClick() {
    if (this.noMessageIndex < this.valentine_no_message.length - 1) {
      this.noMessageIndex++;
      this.yesButtonHeight +=3;
      this.yesButtonWidth +=3;
    }
    
  }

  onYesClick() {
    this.showHappyMessage = true;
  }


}
