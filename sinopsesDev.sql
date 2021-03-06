PGDMP          ;            	    y            snopses_development    13.4 (Debian 13.4-1.pgdg100+1)    13.4 +    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    17789    snopses_development    DATABASE     g   CREATE DATABASE snopses_development WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';
 #   DROP DATABASE snopses_development;
                postgres    false            ?            1259    17924    authors    TABLE     m   CREATE TABLE public.authors (
    id integer NOT NULL,
    name character varying(50),
    birthdate date
);
    DROP TABLE public.authors;
       public         heap    postgres    false            ?            1259    17922    authors_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.authors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.authors_id_seq;
       public          postgres    false    203            ?           0    0    authors_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.authors_id_seq OWNED BY public.authors.id;
          public          postgres    false    202            ?            1259    17971    books    TABLE     6  CREATE TABLE public.books (
    id integer NOT NULL,
    title character varying(250),
    authorid integer NOT NULL,
    publisherid integer NOT NULL,
    synopsisid integer,
    publisheddate date,
    isbn_13 character varying(13),
    imagelink character varying(250),
    categoriesid integer NOT NULL
);
    DROP TABLE public.books;
       public         heap    postgres    false            ?            1259    17969    books_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.books_id_seq;
       public          postgres    false    207            ?           0    0    books_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;
          public          postgres    false    206            ?            1259    17997 
   categories    TABLE     `   CREATE TABLE public.categories (
    id integer NOT NULL,
    category character varying(50)
);
    DROP TABLE public.categories;
       public         heap    postgres    false            ?            1259    17995    categories_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.categories_id_seq;
       public          postgres    false    209            ?           0    0    categories_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;
          public          postgres    false    208            ?            1259    17914 
   publishers    TABLE     \   CREATE TABLE public.publishers (
    id integer NOT NULL,
    name character varying(30)
);
    DROP TABLE public.publishers;
       public         heap    postgres    false            ?            1259    17912    publishers_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.publishers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.publishers_id_seq;
       public          postgres    false    201            ?           0    0    publishers_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.publishers_id_seq OWNED BY public.publishers.id;
          public          postgres    false    200            ?            1259    17932    synopses    TABLE     m   CREATE TABLE public.synopses (
    id integer NOT NULL,
    description text,
    bookid integer NOT NULL
);
    DROP TABLE public.synopses;
       public         heap    postgres    false            ?            1259    17930    synopses_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.synopses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.synopses_id_seq;
       public          postgres    false    205            ?           0    0    synopses_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.synopses_id_seq OWNED BY public.synopses.id;
          public          postgres    false    204                       2604    17927 
   authors id    DEFAULT     h   ALTER TABLE ONLY public.authors ALTER COLUMN id SET DEFAULT nextval('public.authors_id_seq'::regclass);
 9   ALTER TABLE public.authors ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203                       2604    17974    books id    DEFAULT     d   ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);
 7   ALTER TABLE public.books ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    207    207                       2604    18000    categories id    DEFAULT     n   ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);
 <   ALTER TABLE public.categories ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    208    209                       2604    17917    publishers id    DEFAULT     n   ALTER TABLE ONLY public.publishers ALTER COLUMN id SET DEFAULT nextval('public.publishers_id_seq'::regclass);
 <   ALTER TABLE public.publishers ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    200    201                       2604    17935    synopses id    DEFAULT     j   ALTER TABLE ONLY public.synopses ALTER COLUMN id SET DEFAULT nextval('public.synopses_id_seq'::regclass);
 :   ALTER TABLE public.synopses ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204    205            ?          0    17924    authors 
   TABLE DATA           6   COPY public.authors (id, name, birthdate) FROM stdin;
    public          postgres    false    203   Z.       ?          0    17971    books 
   TABLE DATA           ~   COPY public.books (id, title, authorid, publisherid, synopsisid, publisheddate, isbn_13, imagelink, categoriesid) FROM stdin;
    public          postgres    false    207   ?/       ?          0    17997 
   categories 
   TABLE DATA           2   COPY public.categories (id, category) FROM stdin;
    public          postgres    false    209   B0       ?          0    17914 
   publishers 
   TABLE DATA           .   COPY public.publishers (id, name) FROM stdin;
    public          postgres    false    201   ?0       ?          0    17932    synopses 
   TABLE DATA           ;   COPY public.synopses (id, description, bookid) FROM stdin;
    public          postgres    false    205   z1       ?           0    0    authors_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.authors_id_seq', 9, true);
          public          postgres    false    202            ?           0    0    books_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.books_id_seq', 2, true);
          public          postgres    false    206            ?           0    0    categories_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categories_id_seq', 8, true);
          public          postgres    false    208            ?           0    0    publishers_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.publishers_id_seq', 30, true);
          public          postgres    false    200            ?           0    0    synopses_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.synopses_id_seq', 2, true);
          public          postgres    false    204                       2606    17929    authors authors_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.authors DROP CONSTRAINT authors_pkey;
       public            postgres    false    203                       2606    17979    books books_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.books DROP CONSTRAINT books_pkey;
       public            postgres    false    207                       2606    18002    categories categories_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    209                       2606    17919    publishers publishers_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.publishers
    ADD CONSTRAINT publishers_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.publishers DROP CONSTRAINT publishers_pkey;
       public            postgres    false    201                       2606    17940    synopses synopses_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.synopses
    ADD CONSTRAINT synopses_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.synopses DROP CONSTRAINT synopses_pkey;
       public            postgres    false    205                       2606    17980    books books_authorid_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_authorid_fkey FOREIGN KEY (authorid) REFERENCES public.authors(id) ON UPDATE CASCADE ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.books DROP CONSTRAINT books_authorid_fkey;
       public          postgres    false    207    203    2837                       2606    17985    books books_publisherid_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_publisherid_fkey FOREIGN KEY (publisherid) REFERENCES public.publishers(id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.books DROP CONSTRAINT books_publisherid_fkey;
       public          postgres    false    207    2835    201                       2606    17990    books books_synopsisid_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_synopsisid_fkey FOREIGN KEY (synopsisid) REFERENCES public.synopses(id);
 E   ALTER TABLE ONLY public.books DROP CONSTRAINT books_synopsisid_fkey;
       public          postgres    false    2839    207    205                       2606    18008    books fk_id_categories    FK CONSTRAINT        ALTER TABLE ONLY public.books
    ADD CONSTRAINT fk_id_categories FOREIGN KEY (categoriesid) REFERENCES public.categories(id);
 @   ALTER TABLE ONLY public.books DROP CONSTRAINT fk_id_categories;
       public          postgres    false    207    209    2843            ?   ?   x?E?KN1???)|?Tytڙ%LWE?3? ???d*?Ģ????$$/,????1N???g????`???8???K????¹?Ұ???:I^8?y????w?l??a??R?o?w??D?Q7h?ic?S#O?%E?S??7c???f;5RIR?P??,9?dr(????????CH0f?S?9??8{??@????:??eni???+???
?J?      ?   ?   x??νj?0?Y~
M??#?vA'?B7t-Y?]%??????u:t?S??*??c?????#?њA-ߣ?	7W?????k?,qU????ー?'e???MI?<?Y???Q???@?΍wIR????.:VЯ?D???ĽiD??????-??!n?J??7\?M?	~ 􂅺??P????Vi??Ӌ???ЛA?qb??O?Y?wDפd??????9ei???????v?%{?s?K?~      ?      x??=
?0??Y:ENPh???59Bc?"??"?B?C??=?.Vu?x?{?? ~?O???q???olx?(/??K??q??mx'?w
~X?G?M??&
F?<82?{??Z?sM,E???;L?Cf???-{/T      ?   ?   x?=?A
?0D?????@4?V?RDq?[7?$?@?_??[????	?jf???M????qQ?????????׸?`?#??%??jc?o??۱?<恱??/>???'?8?y??ḧ???LUs??????l?U??H?>>W??>W<=      ?     x??U?nG<?_?9?X?:?F?>؀-%q? ȥ?ۤZڙY?c????96???K??'????.%*0?  ?.{?????OO???N?j??J
??c?????Q?*>s???W?C"ǚ(G?????_S\??'O?_??k
??]u?4?0?(?C*!??h?(??Z?K?z??|+#??́:????$??ЅG??4?kbD??k???\????#? ?>????+Ns?$$~?^???~?????????@?????R?J?ۂBZ&W4?xW!O????I???i??K&G? ?$hy?c??."*N???y>C???^??T???Ț^k{??5?_? p} ;N}??i?
?9?(????v?Q?(h?}W+?zqX????U???
??P`?D-ti3q?2????Au[wDyC???Z????w????	?,???`?6??N????Z=
???U?c:??]5????@\?xD?q?ni#?? sLU?E?iH??Ý??8?0I?p?;@?o?rʱdCi???????-??HU???y??:??w?`?{&????r_?8?VB??6?3<??[?$~?(???e 爥Ƌ??&??? ??z??>?j虤?l???#??V.p<????????uUm?????h??N?K},?ִ??f??A?h,????ӓ?	Y*??fS?,??ޖ????B[?,cn.^|E??E<d?xt?M???Y4??X??SlI?Á????E+G?G??????2?0_z]??̀l??Z??}??QV??`zv?
?F??cF?^??A?W??V{i?[?q?????c?v???KX??? ???~??5?$?e??????G?p????;U??????'?Co
?jJ????\-{?ܬ?hU?jID????????????j???/??     