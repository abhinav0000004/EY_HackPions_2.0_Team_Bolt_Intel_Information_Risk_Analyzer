from flask import *
from final_function import category
import firebase_admin
from firebase_admin import credentials, firestore
app = Flask("app")
cred = credentials.Certificate("config.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
doc_ref = db.collection(u'results')
risks_category = ['civil unrest', 'security', 'crime', 'travel', 'terrorism', 'infrastructure', 'political', 'institutional', 'kidnap','medical']
@app.route('/success', methods = ['POST'])
def success():
        if request.method == 'POST':
                f = request.files['file']
                results = {};
                f.save(f.filename)
                results = category(f.filename, 'z')
                country = results['Incident Country'].lower()
                con = db.collection(u'{0}'.format(country))
                risk_score = 0.2 * int(results['RiskScore']['Client_Presence']) + 0.2 * int(results['RiskScore']['Head Count']) + 0.2 * int(results['RiskScore']['Number_of_incident']) + 0.2 * int(results['RiskScore']['Number_of_office']) + 0.2 * int(results['RiskScore']['Severity'])
                dict = {};
                if (len(list(con.list_documents())) <= 0):
                        for r in risks_category:
                                if (r == results['Category'].lower()):
                                        dict[r] = {'mean': str(risk_score), 'count': '1'}
                                else:
                                        dict[r] = {'mean': '0', 'count': '0'}
                else:
                        for c in con.stream():
                                dict = c.to_dict()
                                c.reference.delete()
                        for r in risks_category:
                                if (r == results['Category'].lower()):
                                        m = float(str(dict[r]['mean']))
                                        count =int(str(dict[r]['count'])) + 1
                                        m = (count - 1) * m
                                        m = (m+ risk_score) / count;
                                        dict[r] = {'mean': str(m), 'count': str(count)}
                con.add(dict)
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
                                'noet':str(results['Expected Travellers']),
                                'country_bscore':str(results['Baseline Score']),
                                'dynamic_rcscore':results['RiskScore'],
                                'event_eiscore':str(results['Impact Score'])
                }
                final_result  = doc_ref.add(doc);
                return redirect("http://localhost:3000/Display_results.htm", code=302)


@app.route('/success1', methods = ['POST'])
def success1():
        if request.method == 'POST':
                f = request.form['text']
                results = {};
                results = category('', f)
                country = results['Incident Country'].lower()
                con = db.collection(u'{0}'.format(country))
                risk_score = 0.2 * int(results['RiskScore']['Client_Presence']) + 0.2 * int(results['RiskScore']['Head Count']) + 0.2 * int(results['RiskScore']['Number_of_incident']) + 0.2 * int(results['RiskScore']['Number_of_office']) + 0.2 * int(results['RiskScore']['Severity'])
                dict = {};
                if (len(list(con.list_documents())) <= 0):
                        for r in risks_category:
                                if (r == results['Category'].lower()):
                                        dict[r] = {'mean': str(risk_score), 'count': '1'}
                                else:
                                        dict[r] = {'mean': '0', 'count': '0'}
                else:
                        for c in con.stream():
                                dict = c.to_dict()
                                c.reference.delete()
                        for r in risks_category:
                                if (r == results['Category'].lower()):
                                        m = float(str(dict[r]['mean']))
                                        count =int(str(dict[r]['count'])) + 1
                                        m = (count - 1) * m
                                        m = (m+ risk_score) / count;
                                        dict[r] = {'mean': str(m), 'count': str(count)}
                con.add(dict)
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
                                'noet':str(results['Expected Travellers']),
                                'country_bscore':str(results['Baseline Score']),
                                'dynamic_rcscore':results['RiskScore'],
                                'event_eiscore':str(results['Impact Score'])
                }
                final_result  = doc_ref.add(doc);
                return redirect("http://localhost:3000/Display_results.htm", code=302)