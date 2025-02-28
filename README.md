This is a Node js app for converting .png, .jpg, .gif, .tiff, .ai, .pdf, and .eps files to svg.

The pixel-based file types will also be vectorized upon converting.

The app is meant to be deployed on a linux machine.

Prerequisites:

1. Install inkscape on linux.
2. Install ghostscript on linux.

To run this app follow the steps below:

1. Clone this repository on the linux server.
2. Install the packages: "npm i"
3. Install pm2 globally: "npm install pm2 -g"
4. Run the app: "pm2 start ecosystem.config.js"
5. Call the endpoints:
  5.1. Ai/PDF to svg:  localhost:5555/api/aiPdf
  5.2. Raster images to svg: localhost:5555/api/traceVector
  5.3. Eps to svg: localhost:5555/api/eps

Make sure to add the "file" property to the body parameter.
![image](https://github.com/user-attachments/assets/eabaab0c-07eb-43ea-a6fb-84b10ea084cf)

The app will return the svg in the response.
