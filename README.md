# EY_HackPions_2.0_Team_Bolt_Intel_Information_Risk_Analyzer
* There are various sort of risk associated with an organization inspired from incidents which time and again need to be understood, monitored and analyzed properly or else can have an adverse impact on the performance and growth of the organization. 
* The basic idea behind this problem is to analyze the information received from various sources and identify the different sorts of risk triggered by some incidents and understand the amount of risk it brings to the firm and its possible impacts.
* Objective was to create a web application that can take email as input and identify the source, risk category, and the country mentioned in the mail and gives a table of content which includes crucial details dynamic risk score, impact score, the severity of the risk, etc. along with EY information of the area/region/country as an output. 
* Along with that, a dynamic dashboard is required where the company can visualize meters related to various risks and can analyze the severity of the various risk as per the geographical location. Also, its required to include various time-series graphs for risks in order to understand patterns and make strong. And for better understanding, provide intelligent information. conclusions

## Data
### Dataset 
This folder contains various mails received from various sources regarding different sort of risks occured in different countries and cities. Input can be given in one of the following ways:
* PDF of the mail
* Text file of the mail
* Text copied from mail directly.
### Supporting Data
This data is received from EY which contains geographical details various about EY offices as well as details on various sort of risks.These are the excel files in the [Supporting data](https://github.com/abhinav0000004/EY_HackPions_2.0_Team_Bolt_Intel_Information_Risk_Analyzer/tree/main/Supporting%20Data) folder.
1. **Baseline** contains baseline score country wise which is an important factore to find inpct score.
2.  **Category** contains details about various risks and keywords associated with each risk.
3.   **Location and Headcount** contains the details about various EY offices at different location and number of Employees. 
4.   **Risk Score** contains preprocessed details about various factors used to calculate Risk Score.
5.   **Severity** contains mapping of various risk with countries which gives us severity of a particular risk in a country.
6.    **Travellers** contains infromation about current travellers to the particular country.
