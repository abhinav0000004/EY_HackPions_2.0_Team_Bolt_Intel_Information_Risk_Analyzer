
#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import firebase_admin
from firebase_admin import credentials, firestore
from function import category

cred = credentials.Certificate("config.json")
firebase_admin.initialize_app(cred)
results = category('abhi.pdf')
db = firestore.client()
doc_ref = db.collection(u'results')
doc = {
                                'Date_time' : results['Incident Date:'],
                                'incident_title' : results['Title:'],
                                'incident_description':results['Description'],
                                'incident_country':results['Incident Country'],
                                'incident_city':results['Incident City'],
                                'risk_category':results['Category'],
                                'Severity':results['Severity'],
                                'ey_offimp':str(results['EY Office Impacted']),
                                'noe':str(results['Number of Employees']),
                                'noct':str(results['Current Travellers']),
                                'noet':str(results['Current Travellers']),
                                'country_bscore':str(results['Baseline Score']),
                                'dynamic_rcscore':'1',
                                'event_eiscore':'2'
                }
final_result  = doc_ref.add(doc);
print(final_result)
                # return "success"


