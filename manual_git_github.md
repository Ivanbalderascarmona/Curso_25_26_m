# Manual para configurar el git por ssh

## Comando para comprobar si tienes la contraseña

    ls -la ~/.ssh

    Abajo tiene que salir unos archivos que terminen o se llamen asi: id_ed25519 y id_ed25519.pub

## Instalacion de la clave en Github 

    ssh-keygen -t ed25519 -C"balderascarmonaivan@gmail.com"



## Saber tu clave ssh publica para conectarte a Github

    cat ~/.ssh/id_ed25519.pub

## Añadir la clave a Agent

    1. eval "$(ssh-agent -s)"

    2. ssh-agent ~/.ssh/id_ed25519

> Si no te funciona vas a powershell y lo arreglas ahi con otros comandos de Powershell

## Verificar la clave

Una vez ya conectado con github se prueba el siguiente comando

    ssh -T git@github.com
> Si te funciona te saldra un saludo con tu nombre de usuario y que se ha conectado correctamente.