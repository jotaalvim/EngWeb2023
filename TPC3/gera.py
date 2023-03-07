import json

with open('dataset-extra1.json') as json_file:
    data = json.load(json_file)
 
i = 0
for dict in data['pessoas']:
    dict['id'] = 'p' + str(i)
    i+= 1

with open('dataset-extra2.json','w') as json_file:
    json.dump(data,json_file)
