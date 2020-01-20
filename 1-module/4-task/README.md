## Проверка на спам ##

Напишите функцию `checkSpam(str)`, возвращающую `true`, если `str` содержит `'1xBet'` или `'XXX'`, а иначе `false`.

Функция должна быть нечувствительна к регистру:

```javascript
checkSpam('1XbeT now') === true
checkSpam('free xxxxx') === true
checkSpam('innocent rabbit') === false
```
