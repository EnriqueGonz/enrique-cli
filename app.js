const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const inquirer = require('inquirer')
const shell = require('shelljs')

clear();

console.log('');
console.log('');

console.log(
    chalk.blue(
        figlet.textSync('EnriqueGonz', { font: 'ogre', horizontalLayout: 'full' })
    )
);

inquirer.prompt([
    {
        name: 'list',
        type: 'list',
        message: '¿Que decea realizar?',
        choices: [
            {
                name: 'Enviar correo express',
                value: '1'

            },
            {
                name: 'Descarga Video Youtube',
                value: '2'
            },
            {
                name: 'Descargar Musica Youtube',
                value: '3'
            },
            {
                name: 'exit',
                value: '4'
            }
        ]
    }
]).then(answers => {
    console.log(answers);
    if (answers.list == 1) {
        email()
    }
    if (answers.list == 2) {
        descargarvideo()
    }
    if (answers.list == 3) {
        descargarmusica()
    }
    if (answers.list == 4) {
        process.exit()
    }
});



function email() {
    console.log('Opcion: email')
    inquirer.prompt([
        {
            name: 'user',
            type: 'input',
            message: 'Ingresa Usuario: ',
        },
        {
            name: 'pass',
            type: 'password',
            message: 'Ingresa password: ',
        },
        {
            name: 'destino',
            type: 'input',
            message: 'Ingresa Destinatario: ',
        },
        {
            name: 'asunto',
            type: 'input',
            message: 'Ingresa Asunto: ',
        },
        {
            name: 'texto',
            type: 'input',
            message: 'Ingresa texto: ',
        },

    ]).then(answers => {
        "use strict";
        const nodemailer = require("nodemailer");
        async function main() {
            let account = await nodemailer.createTestAccount();
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: answers.user,
                    pass: answers.pass
                }
            });

            let mailOptions = {
                from: answers.user,
                to: answers.destino,
                subject: answers.asunto,
                text: answers.texto
            };
            let info = await transporter.sendMail(mailOptions)
            clear();
            console.log("Message sent:", info.messageId);
            console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
            console.log("Correo Enviado");
        }
        main().catch(console.error);
    })
}

function descargarvideo() {
    console.log('Opcion Descargar Video')
    inquirer.prompt([
        {
            name: 'url',
            type: 'input',
            message: 'Ingresa la url: '
        },
        {
            name: 'nombre',
            type: 'input',
            message: 'Ingresa nombre para guardar el archivo: '
        }
    ]).then(answers => {
        'use strict';

        var fs = require('fs');
        var youtubedl = require('youtube-dl');

        var video = youtubedl(answers.url,
            // Optional arguments passed to youtube-dl.
            ['--format=18'],
            // Additional options can be given for calling `child_process.execFile()`.
            { cwd: __dirname });
        // Will be called when the download starts.
        video.on('info', function (info) {
            console.log('Descarga Iniciada');
            console.log('filename: ' + info._filename);
            console.log('size: ' + info.size);
            video.pipe(fs.createWriteStream(answers.nombre+'.mp4'));
        });
    })
}


function descargarmusica() {
    console.log('Opcion Descargar Musica')
    inquirer.prompt([
        {
            name: 'url',
            type: 'input',
            message: 'Ingresa la url: '
        },
        {
            name: 'nombre',
            type: 'input',
            message: 'Ingresa nombre para guardar el archivo: '
        }
    ]).then(answers => {
        'use strict';

        var fs = require('fs');
        var youtubedl = require('youtube-dl');

        var video = youtubedl(answers.url,
            // Optional arguments passed to youtube-dl.
            ['--format=18'],
            // Additional options can be given for calling `child_process.execFile()`.
            { cwd: __dirname });
        // Will be called when the download starts.
        video.on('info', function (info) {
            console.log('Descarga Iniciada');
            console.log('filename: ' + info._filename);
            console.log('size: ' + info.size);
            video.pipe(fs.createWriteStream(answers.nombre+'.mp3'));
        });
    })
}




