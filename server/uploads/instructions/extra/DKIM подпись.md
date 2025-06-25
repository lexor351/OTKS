#почта #exim 

## Добавление/обновление DKIM подписи

DKIM подпись находится на [[Общая информация (Почта)|почтовом сервере]] на джейле Exim (/usr/local/etc/exim/dkim)

Для добавления/обновления подписи нужно перейти в директорию где она хранится и затем ввести следующую команду:
```
openssl genrsa -out yakutia.ru.key 1024 //генерируем секретный ключ длинной 1024 с названием yakutia.ru.key
```

```
openssl rsa -pubout -in yakutia.ru.key -out yakutia.ru.key.pub //получаем публичный ключ с названием yakutia.ru.key.pub из секретного с названием yakutia.ru.key
```

Перезапустить сервис Exim (service exim restart)

ВАЖНО НЕ ИЗМЕНЯТЬ НАЗВАНИЕ КЛЮЧА

После генерирования ключа нужно заменить его в DNS записи, для этого:

На [[Общая информация (DNS)|DNS сервере freevc]], зайти на джейл ns и найти файл yakutia.ru.zone в директории /usr/local/etc/namedb/zone_ru/

Почти в самом конце файла будет строка mailykt._ domainkey.yakutia.ru   IN    TXT    (.............)
эту строку нужно закомментировать (добавить перед строкой ;;) и создать точно такую же строку и изменить в ней содержимое скобок на новый публичный ключ (yakutia.ru.key.pub)

ПРИМЕР 
mailykt._ domainkey.yakutia.ru   IN    TXT  ( "v=DKIM1; k=rsa; p=*newpublickey*FDDSKFSLDFSJFERNELRWifdosfeERNWELR" )

Сохранить файл и перезапустить сервис named (service named restart)