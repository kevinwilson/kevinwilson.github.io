---
layout: default
---

## Public health informatician, computer programmer, and epidemiologist with global health experience.

### A Comparision of Machine Learning Methods for the Prediction of MRSA Infection in Surgical Patients

> This abstract presents prelimiary results from my PhD research and aims to determine whether MRSA infection can be predicted based on a range of demographic factors and clinical signs and symptoms.

#### Description of the Problem

Methicillin-resistant Staphylococcus aureus (MRSA) is the leading cause of antibiotic resistance related mortality in surgical patients.[^1] Effective prediction of MRSA would facilitate the prophylactic use of appropriate antibiotics or application of other prevention techniques, which have been shown to improve clinical outcomes.[^2]  While there is a range of patient, procedural and hospital level factors that have been shown to increase the risk of a surgical patient contracting a MRSA infection, research is less clear on the best approaches to developing predictive models for incorporation into a clinical decision support system. This study will compare two common modeling approaches — logistic regression (LR) and artificial neural networks (ANN)—for the prediction of MRSA infection in patients undergoing major surgical procedures (MSPs) in the United States.

#### Methods

The primary data source for analysis is the National Inpatient Sample (NIS), which contains data on approximately 7 million discharges for each year of data collection. The NIS comprises approximately 100 variables, which include a range of demographic, clinical, procedural, and hospital-related factors. An analysis dataset was prepared that included all patients that underwent a major surgical procedure (MSP). Positive cases were patients with MRSA infection and negative cases were all other patients that underwent an MSP. Due to the large disparity between the number of positive and negative cases, a random sample of negative cases was selected to produce a balanced dataset. The training set contained 49,266 positive cases and 49,431 negative cases. LR and ANN models were built using R version 3.1.3. The ANN model had one hidden layer with 7 neurons. Predictors in both models were age, surgery status (elective vs. urgent), sex, primary payer, race, hospital bed size, hospital teaching status, hospital region and number of comorbidities. Both models were evaluated using a held-out test set with performance assessed using sensitivity, specificity and area-under-the curve (AUC). 

#### Results and Discussion

In the LR model, there were 8,716 true positives, 9,076 true negatives, 3,344 false positives, and 3,539 false negatives. Age, surgery status (elective vs. urgent), sex, primary payer, race, hospital bed size, hospital teaching status, hospital region and number of comorbidities were all confirmed to be statistically-significant predictors. Sensitivity (true positive rate) was 0.74, specificity (true negative rate) was 0.71, and the AUC was 0.78. In the ANN model, there were 9,726 true positives, 8,252 true negatives, 3,946 false positives, and 2,751 false negatives. Sensitivity was 0.68, specificity was 0.77, and the AUC was 0.80. The results suggest that LR and ANN are similarly effective modeling approaches, with LR more effective at correctly identifying positive (MRSA) cases and ANN more effective at correctly identifying negative cases. 

#### Conclusions

This study assessed the feasibility of LR and ANN for the prediction of MRSA infection in surgical patients using a range of demographic, clinical, procedural, and hospital-related factors. The results showed that both algorithms are effective modeling approaches with reasonable sensitivity and specificity and suggest that a clinical decision support tool based on either model could be informative in clinical practice. While performance was reasonable, further research is necessary to assess the impact of a broader range of predictors.

#### References

[^1]: Klein EY, Mojica N, Jiang W, et al. Trends in Methicillin-Resistant Staphylococcus aureus Hospitalizations in the United States, 2010-2014. Clin Infect Dis. 2017;65(11):1921-1923.

[^2]: Humphreys H, Becker K, Dohmen PM, et al. Staphylococcus aureus and surgical site infections: benefits of screening and decolonization before surgery. J Hosp Infect. 2016;94(3):295-304.



