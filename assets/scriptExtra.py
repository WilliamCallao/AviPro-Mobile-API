import json
import requests

#colocar el endpoint de la API
url = ''
headers = {'Content-Type': 'application/json'}

# Leer el archivo 
with open('datosCliente.json') as archivo:
    datos = json.load(archivo)

# Enviar cada registro mediante una solicitud POST
for datito in datos:
    response = requests.post(url, headers=headers, json=datito)
    if response.status_code == 201:
        print('Exito:', datito)
    else:
        print('Errores:', datito, response.text)
