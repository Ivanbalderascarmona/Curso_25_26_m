# Manual para configurar el git por ssh

## Primero inicializamos el repositorio.

```bash
git init
```

  


## En segundo lugar  configuramos nuestro usuario y nuestro email.

```bash
git config --global user.name "tunombre"
git config --global user.email "tuemail@gmail.com"
```


## Comprobamos si tenemos la clave ssh ya en nuestro ordenador

```bash
ls -la ~/.ssh
```
    Abajo tiene que salir unos archivos que terminen o se llamen asi: id_ed25519 y id_ed25519.pub

## Instalacion de la clave en Github 
```bash
ssh-keygen -t ed25519 -C"balderascarmonaivan@gmail.com"

```

## Saber tu clave ssh publica para conectarte a Github
```bash
cat ~/.ssh/id_ed25519.pub
```
## Añadir la clave a Agent

    1. eval "$(ssh-agent -s)"

    2. ssh-agent ~/.ssh/id_ed25519

> Si no te funciona vas a powershell y lo arreglas ahi con otros comandos de Powershell

## Verificar la clave

Una vez ya conectado con github se prueba el siguiente comando

    ssh -T git@github.com
> Si te funciona te saldra un saludo con tu nombre de usuario y que se ha conectado correctamente.