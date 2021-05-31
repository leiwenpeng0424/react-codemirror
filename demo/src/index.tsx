import * as React from "react"
import * as ReactDOM from "react-dom"
import { ReactCodemirror } from "../../dist"

// `class`, `constant`, `enum`,
// `function`, `interface`, `keyword`, `method`,
// `namespace`, `property`, `text`, `type`, `variable`

const App: React.FC<Record<string | number, never>> = () => {
  return (
    <ReactCodemirror
      language="sql"
      style={{ height: 500 }}
      value={`CREATE TABLE MySource(
    user_id BIGINT,
    name varchar,
    user_region TIMESTAMP 
) WITH (
    type ='kafka',
    bootstrapServers ='172.17.2.10:9092',
    offsetReset ='LATEST',
    groupID='fj-flink-sql',
    zookeeperQuorum ='172.17.2.10:2181',
    topic ='fj-flink-out-1',
    ---topic ='mqTest.*',
    ---topicIsPattern='true',
    parallelism = 1
);
    
CREATE TABLE pageviews (
    user_region varchar,
    pv BIGINT,
    uv BIGINT
) WITH (
    type ='kafka',
    bootstrapServers ='172.17.2.10:9092',
    offsetReset ='LATEST',
    groupID='fj-flink-sql',
    zookeeperQuorum ='172.17.2.10:2181',
    topic ='fj-flink-out-1',
    ---serialize ='zengjun',
    ---version ='0.0.1',
    ---pluginFileType ='jar',
    ---topic ='mqTest.*',
    ---topicIsPattern='true',
    parallelism ='1'
);
    
INSERT INTO pageviews
SELECT
  user_region,
  now(),
  COUNT(*),
  COUNT(DISTINCT user_id)
FROM pageviews
GROUP BY user_region;

-- create table function test(
-- ) WITH (
-- packageName = 'com.test',
-- className = 'test',
-- ossUrl = 'accessors-smart-1.2.jar',
-- );
-- create table function func2(
-- ) WITH (
-- packageName = 'com.rocktrol.dmp',
-- className = 'Func2',
-- ossUrl = 'empty.jar',
-- );`}
      placeholder={[
        "Placeholder example1: SELECT * FROM AAA",
        "Placeholder example2: SELECT * FROM BBB",
        "Placeholder example3: SELECT * FROM CCC",
        "Placeholder example4: SELECT * FROM DDD",
        "Placeholder example5: SELECT * FROM EEE",
        "Placeholder example6: SELECT * FROM FFF",
      ]}
      formatter={(text: string) => text}
      langOptions={{
        upperCaseKeywords: true,
        schema: {
          aaa: [
            {
              label: "column-a",
            },
            {
              label: "column-b",
            },
            {
              label: "column-c",
            },
          ],
          bbb: [],
        },
        tables: [{ label: "aaa", info: "aaa is aaa" }],
      }}
      snippets={[
        {
          label: "TUMBLE",
          info: "TUMBLE",
          template:
            "TUMBLE(${1:proctime}, ${2:interval} '${3:count}' ${4:unit})",
        },
        {
          label: "TUMBLE_START",
          info: "TUMBLE_START",
          template:
            "TUMBLE_START(${1:proctime}, ${2:interval} '${3:count}' ${4:unit})",
        },
        {
          label: "TUMBLE_END",
          info: "TUMBLE_END",
          template:
            "TUMBLE_END(${1:proctime}, ${2:interval} '${3:count}' ${4:unit})",
        },
        {
          label: "kafka",
          info: "kafka",
          template: "kafka",
          hit: "type-=",
        },
        {
          label: "gp",
          info: "gp",
          template: "gp",
          hit: "type-=",
        },
        {
          label: "gql",
          info: "gql",
          template: "gqll",
          hit: "type-=",
        },
      ]}
    />
  )
}

ReactDOM.render(<App />, document.getElementById("app"))
