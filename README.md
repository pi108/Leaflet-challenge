# Leaflet Challenge: 

## This repository contains the folders and files regarding a Leaflet exercise that was performed with data related to earthquakes and fault lines. 
The data related to earthquakes was obtained from the following website:
XXXXX
The data related to fault lines was obtained from the following website:
XXXXX

### Files and Folder Structure:
This repository contains the following:
1.	An HTML file called "index" which is the file used for the webpage.
2.  A folder called "data" that contains a file called PB2002_plates. This file contains the data related to the fault lines. 
3.  A folder called images. This folder contains images of the different views of the final webpage.
4.  A folder called "static". 
This folder contains the following subfolders:
* css: This folder contains a file related to styling / formatting.
* Js: This folder contains the main javascript file called “app” that is used in the index.html file.

### Dataset Details:
The dataset provided to us in the csv file contained the following columns:
* Id
* Name of the State
* Abbreviation of the State
* Poverty 
* Poverty Margin of Error
* Age / Age Margin of Error
* Poverty / Poverty Margin of Error
* Income / Income Margin of Error
* Healthcare / Healthcare Low / Healthcare High
* Obesity / Obesity Low / Obesity High
* Smokes / Smokes Low / Smokes High

### Webpage Details:
We were asked to build a webpage containing a “dynamic scatter plot” with 3 labels on the X Axis (Poverty / Age / Income) and 3 labels on the Y Axis (Obesity / Smokes / Healthcare) that allows the user to select any combination of an X axis and a Y axis label, and see the scatter plot update automatically for the selected labels. 
<br>
<br>
The scatter plot displays 51 circles representing data for the 50 states and one Federal District (Washington D.C.) of the Unites States of America.Each circle represents the datapoints for the selected X Axis and Y Axis labels for a particular state. The abbreviation for each state is inside the relevant circle. For instance, TX in a circle represents the data for the state of Texas, CA in a circle represents data for the state of California, and so on. If you hover over any of the circles, you will see a pop up box that shows the full name of the State, and the data values for both, the selected X Axis and Y Axis Labels.
<br>
<br>
This is an image of the default map when the webpage is launched. 
The Basemap is a Satellite View of the Earth.
On this Basemap we have plotted the fault lines (represented by the red line) and the magnitudes of the earthquakes (represented by the different colored circles):
<br>
<br>
![](images/01_Satellite.PNG)
<br>
<br>
If the user selects the Baasemap called "Satellite-Streets" (and leaves the fault lines and earthquake options checked), then the webpage will look as follows:
<br>
<br>
![](images/02_Satellite_Streets.PNG)
<br>
<br>
If the user selects the Baasemap called "Light" (and leaves the fault lines and earthquake options checked), then the webpage will look as follows:
<br>
<br>
![](images/03_Light.PNG)
<br>
<br>
If the user selects the Baasemap called "Dark" (and leaves the fault lines and earthquake options checked), then the webpage will look as follows:
<br>
<br>
![](images/04_Dark.PNG)
If the user selects the Baasemap called "Outdoors" (and leaves the fault lines and earthquake options checked), then the webpage will look as follows:
<br>
<br>
![](images/05_Outdoors.PNG)
