Vue.component('feedbackform', {
    data(){
        return {
            nameRule: new RegExp(/^[a-zа-яё\s]+$/i),
            emailRule: new RegExp(/^[a-z\-\.]+(@mail\.ru)$/i),
            phoneRule: new RegExp(/^(\+7)\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/i),
            showName: true,
            showEmail: true,
            showPhone: true,
            showMessage: true
        }
    },
    template: `<form action="#" class="feedback" @submit = "contactForm($event)">
                    <div class = "message" id = 'feedback-name' v-if="!this.showName">Допустимы только буквы</div>
                    <input type="text" class = 'feedback-name f-item' placeholder="Your name">
                    <div class = "message" id = feedback-email v-if="!this.showEmail">Необходим формат my.m-ail@mail.ru</div>
                    <input type="email" class = 'feedback-email f-item' placeholder="Your email">
                    <div class = "message" id = 'feedback-phone' v-if="!this.showPhone">Необходим формат +7(000)000-0000</div>
                    <input type="text" class = 'feedback-phone f-item' placeholder="Your phone">
                    <textarea name="" id="" cols="30" rows="10" class = 'feedback-text f-item' placeholder="Write your message here"></textarea>
                    <button type = 'submit' class = 'feedback-button'>Send</button>
                    <div class="success" v-if="!this.showMessage">Сообщение не может быть отправлено</div>
                </form>`,
    methods:{
            contactForm(e) {
                this.showName = this.nameRule.test(document.querySelector('.feedback-name').value);
                this.showEmail = this.emailRule.test(document.querySelector('.feedback-email').value);
                this.showPhone = this.phoneRule.test(document.querySelector('.feedback-phone').value);
                this.showMessage = this.showName * this.showEmail * this.showPhone;
                if (!(this.showMessage)) {
                    e.preventDefault();
                }
                if (!this.showName) {document.querySelector('.feedback-name').classList.add('redBorder');}
                else {document.querySelector('.feedback-name').classList.remove('redBorder');}
                if (!this.showEmail) {document.querySelector('.feedback-email').classList.add('redBorder');}
                else {document.querySelector('.feedback-email').classList.remove('redBorder');}
                if (!this.showPhone) {document.querySelector('.feedback-phone').classList.add('redBorder');}
                else {document.querySelector('.feedback-phone').classList.remove('redBorder');}
            }   
        }  
})