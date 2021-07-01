const options = {
    title: 'My Modal',
    closable: true,
    content: `
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
    `,
    width: 600,
    footerButtons: [
        {text: 'Ok', bgColor: 'green', handler() {
                console.log('Click on btn green')
            }
        },
        {text: 'Cancel', bgColor: 'red', handler() {
                console.log('Click on btn red')
            }
        },
        {text: 'Cancel', handler() {
                console.log('Click on btn red')
            }
        }
    ]
}

const modal = base.modal(options);
