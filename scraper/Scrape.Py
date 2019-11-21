import requests
import lxml.html as lh
import json

url='https://www.fivecolleges.edu/academics/courses?field_course_semester_value=S&field_course_year_value=2020&field_course_institution_value%5B%5D=U&title=&course_instructor=&body_value=&field_course_number_value=&field_course_subject_name_value=&field_course_subject_value='#Create a handle, page, to handle the contents of the website
page = requests.get(url)#Store the contents of the website under doc
doc = lh.fromstring(page.content)#Parse data that are stored between <tr>..</tr> of HTML
tr_elements = doc.xpath('//tr')

print([len(T) for T in tr_elements[:12]])


col=[]
i=0
uid = 1

for t in tr_elements[0]:
    name=t.text_content()
    print '%d:"%s"'%(i,name.strip())
    col.append(name.strip())

values = {}
values[0] = col

urladdition = "&page=0%2C0%2C"
details_url = "https://www.fivecolleges.edu/courses/UM/2020/SPRING/"

#parse page one with original url 
for r in range(1, len(tr_elements)):
        values[uid] = []
        for t in tr_elements[r]:
            field=t.text_content()
            #print '%d:"%s"'%(field.strip())
            values[uid].append(field.strip())
        print(details_url + tr_elements[r][0].text_content().strip() + '/' + tr_elements[r][1].text_content().strip() + '/' + tr_elements[r][2].text_content().strip() + '/')
        detail_pages = requests.get(details_url + tr_elements[r][0].text_content().strip() + '/' + tr_elements[r][1].text_content().strip() + '/' + tr_elements[r][2].text_content().strip() + '/')#Store the contents of the website under doc
        detail_doc = lh.fromstring(detail_pages.content)#Parse data that are stored between <tr>..</tr> of HTML
        context_elements = detail_doc.xpath('//div[@class="field-item even"]/text()')
        context_labels = detail_doc.xpath('//div[@class="field-label"]/text()')
        #print(context_elements)[5:]
        #print(context_labels[5:])
        values[uid].append("Description: " + context_elements[5])
        for i in range(5, min(len(context_labels), len(context_elements)-1)):
            values[uid].append(context_labels[i].strip() + context_elements[i+1])
        uid+=1

#repeat with subsequent pages but add additional url page code
for page in range(1, 151):
    print("Page Count: " + str(page) + "/150")
    pages = requests.get(url + urladdition + str(page))#Store the contents of the website under doc
    doc = lh.fromstring(pages.content)#Parse data that are stored between <tr>..</tr> of HTML
    tr_elements = doc.xpath('//tr')
    for r in range(1, len(tr_elements)):
        values[uid] = []
        for t in tr_elements[r]:
            field=t.text_content()
            #print '%d:"%s"'%(field.strip())
            values[uid].append(field.strip())
        print(details_url + tr_elements[r][0].text_content().strip() + '/' + tr_elements[r][1].text_content().strip() + '/' + tr_elements[r][2].text_content().strip() + '/')
        detail_pages = requests.get(details_url + tr_elements[r][0].text_content().strip() + '/' + tr_elements[r][1].text_content().strip() + '/' + tr_elements[r][2].text_content().strip() + '/')#Store the contents of the website under doc
        detail_doc = lh.fromstring(detail_pages.content)#Parse data that are stored between <tr>..</tr> of HTML
        context_elements = detail_doc.xpath('//div[@class="field-item even"]/text()')
        context_labels = detail_doc.xpath('//div[@class="field-label"]/text()')
        #print(context_elements)[5:]
        #print(context_labels[5:])
        if(len(context_elements) > 5):
            values[uid].append("Description: " + context_elements[5])
        for i in range(5, min(len(context_labels), len(context_elements)-1)):
            values[uid].append(context_labels[i].strip() + context_elements[i+1])
        uid+=1




with open('values.txt', 'w') as outfile:
    json.dump(values, outfile)