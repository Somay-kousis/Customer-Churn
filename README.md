<div align="center">

# customer churn prediction

> trying to predict when users are emotionally preparing to disappear.

<br>

<img src="https://img.shields.io/badge/python-111111?style=for-the-badge&logo=python&logoColor=white">
<img src="https://img.shields.io/badge/pandas-111111?style=for-the-badge&logo=pandas&logoColor=white">
<img src="https://img.shields.io/badge/scikit--learn-111111?style=for-the-badge&logo=scikitlearn&logoColor=white">
<img src="https://img.shields.io/badge/xgboost-111111?style=for-the-badge">
<img src="https://img.shields.io/badge/catboost-111111?style=for-the-badge">
<img src="https://img.shields.io/badge/classification-111111?style=for-the-badge">

<br><br>

```
roc-auc: 0.9176
precision: 0.608
recall: 0.831
f1-score: 0.703
```

</div>

---

## what started as

```python
customer → features → model → churn?
```

## what it became

```python
customer
    ↓
feature engineering
    ↓
probability estimation
    ↓
threshold tuning
    ↓
business tradeoffs
    ↓
churn prediction
```

The goal was never to maximize accuracy.

The goal was to understand:

- who is likely to leave
- why they leave
- how different models behave when mistakes become expensive

---

# dataset

A telecom customer dataset containing:

```text
demographics
subscription information
contract details
internet services
billing history
payment behaviour
customer tenure
```

Target:

```text
Churn
├── Yes
└── No
```

---

# feature engineering

Raw features were useful.

The engineered features were where things became interesting.

### customer lifecycle

```python
NewCustomer
LoyalCustomer
```

Customers in their first few months behaved very differently from long-term users.

---

### service engagement

```python
TotalServices
SecurityServices
```

Measures how deeply integrated a customer is within the platform.

---

### spending behaviour

```python
HighMonthlyCharges
AvgChargesPerMonth
```

Captures pricing patterns that raw billing values alone fail to reveal.

---

### behavioural signals

```python
AutoPayment
FiberUser
```

Simple features.

Surprisingly informative.

---

# experiments

<details>
<summary><b>logistic regression</b></summary>

<br>

Best Parameters

```python
{
 'solver': 'lbfgs',
 'penalty': 'l2',
 'class_weight': 'balanced',
 'C': 100
}
```

| Metric | Score |
|----------|----------|
| Accuracy | 0.808 |
| Recall | 0.878 |
| Precision | 0.547 |
| F1 | 0.674 |
| ROC-AUC | 0.909 |

</details>

---

<details>
<summary><b>decision tree</b></summary>

<br>

Best Parameters

```python
{
 'min_samples_split': 10,
 'min_samples_leaf': 5,
 'max_depth': 5,
 'criterion': 'gini',
 'class_weight': 'balanced'
}
```

| Metric | Score |
|----------|----------|
| Accuracy | 0.790 |
| Recall | 0.887 |
| Precision | 0.521 |
| F1 | 0.656 |
| ROC-AUC | 0.900 |

</details>

---

<details open>
<summary><b>xgboost (final model)</b></summary>

<br>

Best Parameters

```python
{
 'n_estimators': 560,
 'learning_rate': 0.216,
 'max_depth': 3,
 'subsample': 0.790,
 'colsample_bytree': 0.702,
 'gamma': 0.202,
 'min_child_weight': 2,
 'reg_alpha': 0.403,
 'reg_lambda': 2.687
}
```

Performance

| Metric | Score |
|----------|----------|
| Accuracy | 0.850 |
| Precision | 0.608 |
| Recall | 0.831 |
| F1 | 0.703 |
| ROC-AUC | **0.9176** |

</details>

---

# threshold tuning

One thing this project taught me:

> the best model and the best threshold are two separate decisions.

The same model can behave very differently depending on where the cutoff is placed.

| Threshold | Precision | Recall | F1 |
|------------|------------|------------|------------|
| 0.30 | 0.608 | 0.831 | 0.703 |
| 0.35 | 0.635 | 0.794 | 0.706 |
| 0.40 | 0.662 | 0.751 | 0.704 |
| 0.45 | 0.688 | 0.702 | 0.695 |
| 0.50 | 0.718 | 0.649 | 0.682 |

Mathematically:

```python
threshold = 0.35
```

Business-wise:

```python
threshold = 0.30
```

was often the more interesting choice.

---

# observations

A few things that surprised me:

### shallow trees kept winning

The best XGBoost model preferred:

```python
max_depth = 3
```

even after extensive tuning.

Which suggests churn patterns were driven more by a collection of simple interactions than by highly complex rules.

---

### feature engineering mattered more than model choice

The jump from raw features to engineered features was larger than many hyperparameter tweaks.

---

### accuracy is deceptive

A model can achieve high accuracy while completely failing at catching churners.

Metrics like:

```text
Recall
F1
ROC-AUC
```

were significantly more useful.

---

# final pipeline

```text
raw customer data
          ↓
custom feature engineering
          ↓
xgboost classifier
          ↓
probability score
          ↓
threshold tuning
          ↓
churn prediction
```

---

# repository structure

```text
Customer-Churn
│
├── train.csv
├── test.csv
├── submission.csv
│
├── notebooks
│
├── assets
│
├── README.md
│
└── churn_prediction.ipynb
```

---

<div align="center">

### final thought

the model doesn't predict who leaves.

it estimates who has already started leaving.

</div>
