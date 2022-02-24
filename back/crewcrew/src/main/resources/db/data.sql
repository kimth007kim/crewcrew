delete from category where category_id=1;
delete from category where category_id=2;
delete from category where category_id=3;
delete from category where category_id=4;
delete from category where category_id=5;
delete from category where category_id=6;
delete from category where category_id=7;
delete from category where category_id=8;
delete from category where category_id=9;
delete from category where category_id=10;
delete from category where category_id=11;
delete from category where category_id=12;
delete from category where category_id=13;
delete from category where category_id=14;
INSERT INTO category
    (category_id,category_name,category_parent_id)VALUES
  (1,'스터디',NULL ),
  (2,'취미',NULL ),
  (3,'어학(토플/토익)',1),
  (4,'취업(면접/자소서)',1),
  (5,'고시/공무원',1),
  (6,'사이드 프로젝트(디자인/개발)',1),
  (7,'기타',1),
  (8,'예술(공예/회화)',2),
  (9,'요리(요리/맛집탐방/카페탐방)',2),
  (10,'운동(헬스/구기종목)',2),
  (11,'게임(보드게임/온라인 게임)',2),
  (12,'덕질(코스프레/콘서트/프라모델)',2),
  (13,'트렌드(뷰티/패션)',2),
  (14,'기타',2);
