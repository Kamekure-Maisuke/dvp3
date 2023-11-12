#!/bin/sh

# 実行ディレクトリ
SCRIPT_DIR=$(cd $(dirname $0); pwd)

# wikiから乃木メンバーデータを一旦TSVに整形
DATA=$(
  curl -s "https://ja.wikipedia.org/wiki/%E4%B9%83%E6%9C%A8%E5%9D%8246" |
  grep -E -B 4 '<td>(.+型|不明)</td>' |
  sed -r -e 's/<[^>]+>//g' -e '/--/d' |
  awk '{if(NR%5)ORS="\t";else ORS="\n"; print}'
)

# TSVから行数を取得
ROWS=$(echo "$DATA" | wc -l)

# TSVをJSONに整形
echo "$DATA" | 
awk -v rows="$ROWS" -F '\t' '
  BEGIN{print "["}
  {
    print "  {"
    print "    \"id\":",NR ","
    print "    \"name\":\"",$1 "\","
    print "    \"kana\":\"",$2 "\","
    print "    \"birthDate\":\"",substr($3,1,10) "\","
    print "    \"birthPlace\":\"",$4 "\","
    print "    \"bloodType\":\"",$5 "\""

    # 最終行の時はカンマを外す
    if(NR != rows){
      print "  },"  
    }else {
      print "  }"
    }
  }
  END{print "]"}
' > "$SCRIPT_DIR/../api/data.json"