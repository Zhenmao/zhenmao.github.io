---
title: "Statistical Hypothesis Testing"
categories: "Statistics"
---

# Statistical Hypothesis Testing
Can we draw conclusions about population(s) from sample(s)?

问题1：一家公司的CEO声称，他公司的1000000名客户中有80％对公司的产品非常满意。该公司随机电话抽样回访了100个客户，其中73位客户表示非常满意。我们应该接受CEO的假设？使用α=0.05。

问题2：假设一家制药公司开发出一种新药来预防感冒。该公司指出，该药物对男性和女性同样有效。为了测试这个说法，他们简单随机抽样了100名女性和200名男性从10万志愿者。研究结束时，有38％的女性患上了感冒; 51％的男性患上了感冒。我们是否接受该公司声称的该药物对男性和女性同样有效？使用α=0.05。

问题3：一所小学有1000名学生。学校校长认为，他的学校的学生平均IQ至少为110。为了证明自己的观点，她对20名随机抽样的学生进行智商考试。在抽样学生中，平均IQ为108，标准偏差为10.根据这些结果，校长是否接受她的原始假设？使用α=0.01。 （假设学生的IQ是正态分布的）

问题4：一家公司开发了新的电池。该公司声称，新电池将比其旧电池持续运行至少多7分钟。公司实验室随机抽样了100个新电池和100个旧电池。旧电池平均连续运行190分钟，标准偏差为20分钟; 新电池平均连续运行200分钟，标准偏差为40分钟。根据这些结果，我们是否应该接受新电池比旧电池运行至少多7分钟的说法。使用α=0.05。（假设两个样本中都没有异常值）

## Population Parameters vs Sample Statistics

|                        | Population Parameters | Sample Statistics |
|------------------------|:---------------------:|:-----------------:|
| Number of observations |          $N$          |        $n$        |
| Proportion             |          $p$          |     $\hat{p}$     |
| Mean                   |         $\mu$         |     $\bar{x}$     |
| Standard deviation     |        $\sigma$       |        $s$        |

## Steps of Statistical Hypothesis Testing

1. Identify population parameter being tested for
2. Formulate hypotheses (one or two-tailed)
3. Select significance level $\alpha$
4. Calculate test statistic (z-statistic or t-statistic)
5. Calculate critical value or p-value
6. Reject or retain the null hypothesis

### Step 1: Identify population parameter being tested for
What are we testing for?

* Population mean ($\mu$) 
* Population proportion ($p$)
* Difference of two independent population means ($\mu_1-\mu_2$)
* Difference of two dependent (paired) population means ($\mu_1-\mu_2$)
* Difference of two population proportions ($p_1-p_2$)

### Step 2: Formulate hypotheses
What are we trying to prove?

| The null hypothesis ($H_0$)                                                       | The alternative hypothesis ($H_1$)                                                    |
|-----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| The hypothesis that we try to provide evidence against.                           | The hypothesis that we try to prove to be true.                                       |
| $H_0$ usually states that the population parameter is equal to the claimed value. | $H_1$ usually states that the population parameter is not equal to the claimed value. |
| $H_0$ usually states there is no observed effect.                                 | $H_1$ usually states there is an observed effect.                                     | 

Tip: The sign of alternative hypothesis: $\neq$: two-tailed, $<, \le, >, \ge$: one-tailed.

### Step 3: Select significance level $\alpha$
How tolerant are we about falsely rejecting the null hypothesis?

$\alpha$: Type I error rate. A type I error is when you reject the null hypothesis when it is true.

$\beta$: Type II error rate. A type II error is when you fail to reject the null hypothesis when it is false.

|          |   No Fire  |    Fire    |
|----------|:----------:|:----------:|
| No Alarm |  No Error  |   Type II  |
| Alarm    |   Type I   |  No Error  |

|              |    $H_0$   |    $H_1$   |
|--------------|:----------:|:----------:|
| Accept $H_0$ |  No Error  |   Type II  |
| Reject $H_0$ |   Type I   |  No Error  |

Tip: Common values are 0.05 and 0.01.

### Step 4: Calculate test statistic

$$\text{Test statistic}=\frac{\text{Statistic}-\text{Parameter}}{\text{Standard error of statistic}}$$

| Test for                                                                    | Used when                                                                                                               | Test Name                                      | Test Statistic                                                                                                                                                                                                             |
|-----------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Population mean ($\mu$)                                                     | (Normal population or $n > 30$) **and** $\sigma$ known.                                                                 | One-sample z-test                              | $$z=\frac{\bar{x}-\mu}{\sigma/\sqrt{n}}$$                                                                                                                                                                                |
| Population mean ($\mu$)                                                     | (Normal population or $n > 30$) **and** $\sigma$ unknown                                                                | One-sample t-test                              | $$t=\frac{\bar{x}-\mu}{\sigma/\sqrt{n}}$$$$df=n-1$$                                                                                                                                                                      |
| Population proportion ($p$)                                                 | $np >10$ **and** $n(1−p) >10$ **and** it is a Simple Random Sample.                                                 | One-proportion z-test                          | $$z=\frac{\hat{p}-p}{\sqrt{p(1-p)}}$$                                                                                                                                                                                |
| Difference of two independent population means ($\mu_1-\mu_2$)              | Normal population **and** independent observations **and** $\sigma_1$ and $\sigma_2$ are known                          | Two-sample z-test                              | $$z=\frac{(\bar{x_1}-\bar{x_2})-(\mu_1-\mu_2)}{\sqrt{\frac{\sigma_1^2}{n_1}+\frac{\sigma_2^2}{n_2}}}$$                                                                                                                     |
| Difference of two independent population means ($\mu_1-\mu_2$)              | (Normal populations or $n_1+n_2 >40$) **and** independent observations **and** $\sigma_1=\sigma_2$ unknown              | Two-sample pooled t-test (equal variances)     | $$t=\frac{(\bar{x_1}-\bar{x_2})-(\mu_1-\mu_2)}{s_p\sqrt{\frac{1}{n_1}+\frac{1}{n_2}}}$$$$s_p^2=\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}$$$$df=n_1+n_2-2$$                                                               |
| Difference of two independent population means ($\mu_1-\mu_2$)              | (Normal populations or $n_1+n_2 >40$) **and** independent observations **and** $\sigma_1\neq\sigma_2$ both unknown      | Two-sample unpooled t-test (unequal variances) | $$t=\frac{(\bar{x_1}-\bar{x_2})-(\mu_1-\mu_2)}{\sqrt{\frac{s_1^2}{n_1}+\frac{s_2^2}{n_2}}}$$$$df=\frac{(\frac{s_1^2}{n_1}+\frac{s_2^2}{n_2})^2}{\frac{(\frac{s_1^2}{n_1})^2}{n_1-1}+\frac{(\frac{s_2^2}{n_2})^2}{n_2-1}}$$ |
| Difference of two dependent (paired) population means ($\mu_d=\mu_1-\mu_2$) | (Normal population of differences or $n>30$) **and** $\sigma$ unknown or small sample size $n<30$                       | Paired t-test                                  | $$t=\frac{(\bar{x_1}-\bar{x_2})-\mu_d}{\frac{s_d}{\sqrt{n}}}$$$$df=n-1$$                                                                                                                                                          |
| Difference of two population proportions ($p_1-p_2$)                        | $n_1p_1>5$ **and** $n_1(1 − p_1) > 5$ **and** $n_2 p_2 > 5$ **and** $n_2(1 − p_2) > 5$ and independent observations     | Two-proportion pooled z-test ($H_0:p_1=p_2$)   | $$z=\frac{\hat{p_1}-\hat{p_2}}{\sqrt{\hat{p}(1-\hat{p})(\frac{1}{n_1}+\frac{1}{n_2})}}$$$$\hat{p}=\frac{x_1+x_2}{n_1+n_2}$$                                                                                                |
| Difference of two population proportions ($p_1-p_2$)                        | $n_1p_1>5$ **and** $n_1(1 − p_1) > 5$ **and** $n_2 p_2 > 5$ **and** $n_2(1 − p_2) > 5$ **and** independent observations | Two-proportion unpooled z-test                 | $$z=\frac{(\hat{p_1}-\hat{p_2})-(p_1-p_2)}{\sqrt{\frac{\hat{p_1}(1-\hat{p_1})}{n_1}+\frac{\hat{p_2}(1-\hat{p_2})}{n_2}}}$$                                                                                                 |                                                                                                

Tip: How do I determine whether my data are normal?

* Histogram
* Normal probability plot
* Shapiro–Wilk test

### Step 5: Calculate critical value or p-value

P-value: If the null hypothesis is true, what's the probability of test statistic being at least as extreme as the observed one?

Critical value: (Nowadays mostly in textbooks) If the null hypothesis is true, what's the cutoff value for determine whether the observed test statistic is more extreme than expected?

![Critical Value vs P-Value](critical-value-vs-p-value.png)

Understand p-value:

* The p-value is **not** the probability that the null hypothesis is true, or the probability that the alternative hypothesis is false.
* The p-value is **not** the probability that the observed effects were produced by random chance alone.
* The 0.05 significance level is merely a convention.
* The p-value does **not** indicate the size or importance of the observed effect.

### Step 6: Reject or retain the null hypothesis
P-value: If $p<\alpha$, reject the null hypothesis; if $p\ge\alpha$, retain (fail to reject) the null hypothesis.

Critical value: If test statistic is in rejection region, reject the null hypothesis; if test statistic is outside rejection region, retain the null hypothesis.

## References
1. [http://stattrek.com/]()
2. [U Can: Statistics For Dummies](http://amzn.to/2eWClC0)
3. [The Cartoon Guide to Statistics](http://amzn.to/2xXCsSK)
4. [Learn About Null Hypothesis and Alternative Hypothesis
](https://www.thoughtco.com/null-hypothesis-vs-alternative-hypothesis-3126413)
5. [https://en.wikipedia.org/wiki/Test_statistic]()
6. [How do I determine whether my data are normal?](http://www.psychwiki.com/wiki/How_do_I_determine_whether_my_data_are_normal%3F)
7. [P-Value and Critical Value Comparison](https://www.geogebra.org/m/YRh9H3t5)
8. [Misunderstandings of p-values](https://en.wikipedia.org/wiki/Misunderstandings_of_p-values)
9. [Statistical tests, P values, confidence intervals, and power: a guide to misinterpretations](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4877414/)
10. [Robust misinterpretation of confidence intervals.](https://www.ncbi.nlm.nih.gov/pubmed/24420726)