$(document).ready(function () {
    dataLayer.push({
        'event': 'dl-pageview',
        'pageURL': window.location.href,
        'pageType': 'lk_invite'
    });

    const inviteText = $('#invite-text').html();
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    for (let scrollLink of scrollLinks) {
        scrollLink.addEventListener('click', function (e) {
            e.preventDefault();
            const id = scrollLink.getAttribute('href');
            const element = document.querySelector(id);
            const y = element.getBoundingClientRect().top + window.pageYOffset - 10;
            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    }    
	function sendAnalytics(elabel, eaction) {
        try {
            window.dataLayer.push(
                {
                    event: 'aevent',
                    ecategory: 'invite',
                    eaction: eaction,
                    elabel: elabel,
                    interactionType: 'False',
                },
            )
        } catch (e) {}
    }

    const inviteTextBp = $('#invite-link').text();

    window.copy = function (e) {
        e.preventDefault();
        const text = `${inviteTextBp}`;
        // const text = `${inviteTextBp} ${$('.invite-block').data('link-copy')}`;
        navigator.clipboard.writeText(text);
        window.message("Текст скопирован")('')
    }

    window.sendEmail = function () {
        const text = `${inviteTextBp} ${$('.invite-block').data('link-email')}`;
        window.open('mailto:?subject=Приглашение от друга&body=' + text);
    }

    window.sendSMS = function () {
        const text = `${inviteTextBp} ${$('.invite-block').data('link-sms')}`;
        if (navigator.userAgent.indexOf("Safari") !== -1) {
            window.open('sms:&body=' + text);
        } else {
            window.open('sms:?body=' + text);
        }
    }

    window.showInvites = function () {
        $('.invite-table-tr-hide').removeClass('invite-table-tr-hide');
        $('.invite-table-button').hide();
    }
});