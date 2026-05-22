# DECLASSIFIED MEMORANDUM: PROJECT SILENT_EXIT

> **ARCHIVE LOCATION:** Internal Research Division // Sub-Sec 9  
> **SUBJECT:** Systematic Attrition Analysis of 118,839 Subscriber Accounts  
> **DOCKET STATUS:** Declassified Trial logs  

```text
========================================================================
[CONFIDENTIAL SECURITY OVERVIEW]
ROC-AUC RESOLUTION   : 0.9176
OPTIMAL DECISION (t) : 0.30
DETECTED RISK COEFF  : +1.43
========================================================================
```

---

## INVESTIGATION DOCKET

*   **Chapter 1:** [Customers Leave](#chapter-1-customers-leave)
*   **Chapter 2:** [Obvious Hypotheses Failed](#chapter-2-obvious-hypotheses-failed)
*   **Chapter 3:** [Patterns Started Emerging](#chapter-3-patterns-started-emerging)
*   **Chapter 4:** [What We Learned About Leaving](#chapter-4-what-we-learned-about-leaving)
*   **Chapter 5:** [Failed Theories](#chapter-5-failed-theories)
*   **Chapter 6:** [How Wrong Can We Afford To Be?](#chapter-6-how-wrong-can-we-afford-to-be)
*   **Chapter 7:** [Current Best Explanation](#chapter-7-current-best-explanation)

---

## CHAPTER 1: CUSTOMERS LEAVE

We spent months investigating why subscribers disappear. They don't announce it; they don't call support to argue. They just fade out. This archive is our attempt to map the footprints of silent exit events—to predict when a customer is emotionally preparing to disappear.

---

## CHAPTER 2: OBVIOUS HYPOTHESES FAILED

Our early mitigation strategies relied on intuitive corporate assumptions. When we audited the database logs, we discovered that everything we assumed was incorrect.

*   **Hypothesis 01 // Support Calls Spike**
    *   *Assumption:* Customers call customer support to escalate issues before cancellation.
    *   *Finding:* `FALSIFIED`. Over **70%** of churners left without making a single customer support call in their final 30 days. They exit in absolute silence.
*   **Hypothesis 02 // Price Spikes Only**
    *   *Assumption:* Only customers experiencing sudden rate spikes cut the cord.
    *   *Finding:* `FALSIFIED`. High monthly charges matter, but tenure decay dominates. Long-term stable users cut cords without pricing adjustments.

---

## CHAPTER 3: PATTERNS STARTED EMERGING

Once raw indicators were combined with behavioral timelines, the silent decay signals became visible.

```text
USAGE TELEMETRY PATTERN:
[STABLE] ═══════ Q (Day -90) ═══════╮
                                    │ [FRICTION PHASE]
                                    ╰─────────── Q (Day -30) ══════╮
                                                                   │ [EXIT]
                                                                   ▼
```

1.  **The Slow Decay:** Attrition begins 90 days before the contract breaks. Usage velocity drops logarithmically.
2.  **Asymmetric Costs:** Errors are not equal. Letting a client escape (**False Negative**) costs **$80.00** in lost lifetime value (LTV). Sending a discount offer to a loyal customer (**False Positive**) costs only **$15.00**.

---

## CHAPTER 4: WHAT WE LEARNED ABOUT LEAVING

Raw database columns yielded zero predictive power. The signal only broke through once we engineered custom behavioral markers:

### 1. Onboarding Vulnerability Zone (`NewCustomer`)
*   **Formula:** `tenure <= 3 months`
*   **Measured Impact:** `+16.4% Churn Risk`
*   **Field Annotation:** *If they survive the first 90 days of onboarding friction, their risk probability drops by 60%.*

### 2. Baseline Inertia (`LoyalCustomer`)
*   **Formula:** `tenure >= 50 months`
*   **Measured Impact:** `-24.8% Churn Risk`
*   **Field Annotation:** *Loyalty is fragile. These users stay due to inertia, but remain highly sensitive to contract end-dates.*

### 3. Ecosystem Integration (`TotalServices` & `SecurityServices`)
*   **Formula:** Count of active services (Security, Backup, Protection, Support)
*   **Measured Impact:** `Strong Churn-Reducing Signals`
*   **Field Annotation:** *Ecosystem lock-in is our only true shield. When users trust us with security backups, they rarely cut the cord.*

### 4. Billing Friction (`AvgChargesPerMonth` & `AutoPayment`)
*   **Formula:** TotalCharges / tenure, payment contains 'automatic'
*   **Measured Impact:** `AutoPayment (-14.2% Churn), AvgCharges (+ Risk)`
*   **Field Annotation:** *Manual billing acts as a monthly cognitive trigger forcing the subscriber to re-evaluate their spending. Auto-payment removes friction.*

### 5. Competitor Raid Target (`FiberUser`)
*   **Formula:** `InternetService == 'Fiber optic'`
*   **Measured Impact:** `+18.9% Churn Risk`
*   **Field Annotation:** *Competitors are running aggressive conquest price campaigns directly targeting our fiber footprint.*

---

## CHAPTER 5: FAILED THEORIES

We tested multiple mathematical frameworks to explain subscriber exit vectors. Most were insufficient.

### Trial #082: Linear Assumptions (Logistic Regression)
*   **Verdict:** `REJECTED`
*   **Critique:** Assumed risk scale increases linearly. Completely failed to capture complex, interacting billing spike thresholds.
*   **Specs:** `C: 100, penalty: l2, solver: lbfgs`
*   **ROC-AUC:** `0.9090` | **Precision:** `0.547` | **Recall:** `0.878` | **F1:** `0.674`

### Trial #041: Recursive Partitioning (Decision Tree)
*   **Verdict:** `REJECTED`
*   **Critique:** Decisions were too rigid and brittle. Rules shifted wildly on minor holdout data adjustments.
*   **Specs:** `max_depth: 5, min_samples_split: 10`
*   **ROC-AUC:** `0.9000` | **Precision:** `0.521` | **Recall:** `0.887` | **F1:** `0.656`

### Trial #309: Gradient Boosted Ensembles (XGBoost)
*   **Verdict:** `VIABLE // CHAMPION CONSTRUCT`
*   **Critique:** Safely captures non-linear interactions across engineered behavioral variables without overfitting.
*   **ROC-AUC:** `0.9176` | **Precision:** `0.608` | **Recall:** `0.831` | **F1:** `0.703`

---

## CHAPTER 6: HOW WRONG CAN WE AFFORD TO BE?

Selecting a model tells you how cleanly probability scores are ranked. Calibrating the threshold dictates how the company acts on those scores.

```text
========================================================================
DECISION BOUNDARY AUDIT LEDGER (118,839 Subscriber Operations)
========================================================================
Threshold (t)      Precision     Recall        Net Savings (vs $0 Promo)
------------------------------------------------------------------------
0.30 [SWEET SPOT]  60.8%         83.1%         $1,224,730
0.50 [DEFAULT]     71.4%         64.1%         $1,013,560
========================================================================
```

*   **The Default Trap (t = 0.50):** Delivers clean precision numbers on paper, but lets 9,586 customers escape undetected.
*   **The Calibrated Sweet Spot (t = 0.30):** Triggers more false alarms (14,573), but intercepts 22,205 churners. Because false alarms cost $15 while customer loss costs $80, **this messy threshold saves the treasury an additional $211,170.**

---

## CHAPTER 7: CURRENT BEST IMPLEMENTATION

The current best explanation of subscriber decay is implemented via an optimized gradient ensemble model.

### 📋 Blueprint Configuration
```json
{
  "n_estimators": 560,
  "learning_rate": 0.216,
  "max_depth": 3,
  "subsample": 0.790,
  "colsample_bytree": 0.702,
  "gamma": 0.202,
  "min_child_weight": 2,
  "reg_alpha": 0.403,
  "reg_lambda": 2.687
}
```

### 📁 Recovered Source Structure
```text
Customer-Churn/
│
├── train.csv                # Historical learning slice
├── test.csv                 # Target holdout slice
├── submission.csv           # Final predicted output
│
├── notebooks/               # Original execution dockets
│   └── project.ipynb        # Exploratory analysis & training log
│
└── showcase/                # Recovered interactive archives
    ├── src/components/      # Chapter pages and simulator modules
    └── src/lib/metrics.ts   # Asymmetric cost-benefit ledger engines
```

---

> *"The model does not predict who leaves. It estimates who has already started leaving."*
