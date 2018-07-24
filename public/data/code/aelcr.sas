
/*************************************************************************************************
File name:      aelcr.sas

Study:          

SAS version:    9.4

Purpose:        aelcr table

Macros called:   %ISIS_Report2_table, %AECOUNT_ISIS, %isis_popN, %nobs

Notes:          

Parameters:     
       Patients  =
          column label for subjects number, 'Patients' by default.
Sample:  
 
  %AELCR(title=
              ,pretext=
              ,Norecord=
          ,DataSet=ADaM.ADLCR,Cond1=(ANL01FL),Cond2=(ANL02FL),Cond3=(AESEV="Severe")
          ,popN=%str(adam.adsl|SAFETYFL="Yes")
          ,Group=TRTP,CTGroup=,SubGrp=,CaseVar=USUBJID,Patients=Patients
          ,VarList=
              AEDECOD\ Preferred Term |
  ,Prec=1,outype=1
  ,LTop_1=Patients Reporting at Least One LCRIS
  ,LTop_2=Patients Reporting at Least One Severe LCRIS
  ,TotName=All Subjects,TRTName=,outtotal=1,LTopWid=18
  ,tflines=7,fs=9,Titlejust=C,RptStyle=Rtf,tabwp=98.5,break=1,debug=0
  ,footnote=);

Date started:   02JUN2015
Date completed: 02JUN2015

**Per QA request, please update the modification history follow the format in the 1st line.**

Mod     Date            Name            Description
---     -----------     ------------    -----------------------------------------------
1.0     02JUN2015       Jun.Wu          Create
1.1     01JUL2015       Rongqin.Xie     control total display according to outtotal=
1.2     02JUL2015       Luoying.Shen    Add "Patients Reporting at Least One Severe LCRIS" part at the bottom.
1.3     02JUL2015       Luoying.Shen    Delete LTop parameter and add LTop_1 and LTop_2.
1.4     11DEC2015       Rongqin.Xie     update header
1.5     25DEC2015       Luoying.Shen    Add Patients parameter to control column label for subjects number
1.6     13APR2016       Rongqin.Xie     format program
************************************ Prepared by GCP Clinplus ************************************/

%macro AELCR(title=
            ,pretext=
            ,Norecord=
        ,DataSet=ADaM.ADLCR,Cond1=(ANL01FL),Cond2=(ANL02FL),Cond3=(AESEV="Severe")
        ,popN=%str(adam.adsl|SAFETYFL="Yes")
        ,Group=TRTP,CTGroup=,SubGrp=,CaseVar=USUBJID,Patients=Patients
        ,VarList=
            AEDECOD\ Preferred Term |
,Prec=1,outype=1
,LTop_1=Patients Reporting at Least One LCRIS
,LTop_2=Patients Reporting at Least One Severe LCRIS
,TotName=All Subjects,TRTName=,outtotal=1,LTopWid=18
,tflines=7,fs=9,Titlejust=C,RptStyle=Rtf,tabwp=98.5,break=1,debug=0
,footnote=);

    proc datasets lib=work nolist nodetails;
        delete  lcr lcr_1 lcr_2 lcr_3 lcr_final _table _table_aecount _g1 _cal_n  _report_ ;
    quit;

    %global ngrp ;
    %local ltop2;

%**---------------- Create Variable AECLASS ------------------------;


    data lcr;
        set &DataSet;
            if &Cond1 then SOC1="Part A LCRIS Term";
            else SOC1="Useless Decode";
            if &Cond2 then SOC2="Part B: Discontinue due to ISR";
            else SOC2="Useless Decode";
            if &Cond3 then SOC3="Part C";
            else SOC3="Useless Decode";
            where (&Cond1) or (&Cond2) or (&Cond3);
    run;


    %** If lcr is a null dataset then terminate this macro and return ERROR message ;

    %if %nobs(lcr)=0 %then %do;
        %ISIS_Report2_table(title=&title.
                        ,pretext=&pretext.
                        ,dataset=lcr
                        ,norecord=&norecord
                        ,footnote=&footnote
                        );
       %goto exit;  
    %end;



    %**---------------- Create Data Set lcr_1 ------------------------;


    %AECOUNT_ISIS(title=&title
                ,pretext=&pretext
                ,Norecord=&Norecord
            ,DataSet=lcr,Cond=
            ,popN=&popN
            ,Group=&Group,CTGroup=&CTGroup,SubGrp=&SubGrp,CaseVar=&CaseVar,Patients=&Patients
            ,VarList= SOC1\nnnnnnnn|&VarList.
    ,Prec=&Prec,outype=&outype
    ,LTop="&LTop_1",TRTName=&TRTName,outtotal=&outtotal,LTopWid=&LTopWid
    ,tflines=&tflines,fs=&fs,Titlejust=&Titlejust,RptStyle=&RptStyle,tabwp=&tabwp,break=&break,Endline=0
    ,footnote=&footnote);

    data lcr_1;
        set _table_aecount end=eof;
        if _firstlevel_="Useless Decode" then delete;
        if eof then delete;
        if _ltop="Part A LCRIS Term" then call missing(of npct: events:);;
    run;
    data _table_aecount;
        set _table_aecount ;
        if _n_>0 then delete;
    run;
   %AECOUNT_ISIS(title=&title
                ,pretext=&pretext
                ,Norecord=&Norecord
            ,DataSet=lcr,Cond=(&Cond2)
            ,popN=&popN
            ,Group=&Group,CTGroup=&CTGroup,SubGrp=&SubGrp,CaseVar=&CaseVar,Patients=&Patients
            ,VarList= SOC2\%str()|&VarList.
    ,Prec=&Prec,outype=&outype
    ,LTop="&LTop_1",TRTName=&TRTName,outtotal=&outtotal,LTopWid=&LTopWid
    ,tflines=&tflines,fs=&fs,Titlejust=&Titlejust,RptStyle=&RptStyle,tabwp=&tabwp,break=&break,Endline=0
    ,footnote=&footnote);
    data lcr_2;
        set _table_aecount;
        where _firstlevel_="Part B: Discontinue due to ISR";
        if _ltop="Part B: Discontinue due to ISR" then call missing(of npct: events:);
    run;
    data _table_aecount;
        set _table_aecount ;
        if _n_>0 then delete;
    run;
    %AECOUNT_ISIS(title=&title
                ,pretext=&pretext
                ,Norecord=&Norecord
            ,DataSet=lcr,Cond=(&Cond3)
            ,popN=&popN
            ,Group=&Group,CTGroup=&CTGroup,SubGrp=&SubGrp,CaseVar=&CaseVar,Patients=&Patients
            ,VarList= SOC3\%str()|&VarList.
    ,Prec=&Prec,outype=&outype
    ,LTop="&LTop_2.",TRTName=&TRTName,outtotal=&outtotal,LTopWid=&LTopWid
    ,tflines=&tflines,fs=&fs,Titlejust=&Titlejust,RptStyle=&RptStyle,tabwp=&tabwp,break=&break,Endline=0
    ,footnote=&footnote);

    data lcr_3;
        set _table_aecount;
         where var_seq=1 ;
   run;

    data lcr_final;
        set lcr_1 lcr_2 lcr_3;
    run;

    %**---- calculate the N of each group--------------------------;

    %if %length(&popN)>0 %then %do;
        %let _cal_cond=%qscan(&popN,2,|);
        %let _cal_data=%qscan(&popN,1,|);
    %end;
    %else %if %sysfunc(exist(adam.adsl)) %then %do;
        %let _cal_cond=;
        %let _cal_data=adam.adsl;
    %end;

    %let gsort=%qscan(&group,2,|);
    %let group=%qscan(&group,1,|);

    %isis_popN(dataset=&_cal_data,cond=&_cal_cond,ctgroup=&ctgroup,group=&group,gsort=&gsort);



    data _g1;
        length &Group. $200;
        set _cal_n end=eof;
        output;
        if eof then do;
            call symputx("grpnum",_n_);

            %if &CTGroup^=%str() and "&outtotal."="1" or "&outtotal."="2" %then %do;
                &Group.="&TRTname";
                _grpsum=&grptotal2;
                _grpn=_grpn+1;
                output;
            %end;
            %if "&outtotal."="1" %then %do;
                &Group.="&totname";
                _grpsum=&grptotal1;
                _grpn=_grpn+1;
                output;
            %end;
        end;
    run;

    data _null_ ;
         set _g1 end=final; 
         call symputx("grp"||left(put(_n_,best.)),&Group);
         call symputx("total"||left(put(_n_,best.)),_grpsum);
         if final then call symputx("ngrp",_n_);
    run;



    %let _outngrp=&ngrp;
    %if &outtotal eq 0 %then %let _outngrp=%eval(&_outngrp-1);
    %if &outype=1 %then %let _outngrp=%eval(&_outngrp+&_outngrp);
    %let grpwid=%sysfunc(int(%sysevalf((98.5-&LTopWid)/&_outngrp)));

    %do _m=1 %to &ngrp.;
            %if %index(&&grp&_m,/) or %index(&&grp&_m,|) %then %let grp&_m=%sysfunc(tranwrd(%sysfunc(tranwrd(&&grp&_m,/,%str(%/))),|,%str(%|)));
    %end;


    %ISIS_Report2_table(pretext=&pretext.
            ,dataset=lcr_final
            ,cond   =
            ,varlist=
                 _ltop/ %str() /&LTopWid.\L|

                 %do _m=1 %to &ngrp.;
                    %if &_m eq &ngrp and &outtotal eq 0   %then %goto cntnue;
                    %if &outype=1 %then %do;
                        npct&_m/Patients (%str(%%)) /%sysevalf(&grpwid.*1.2)/%str(&&grp&_m)&split. (N=&&total&_m.)|
                        events&_m/Events/%sysevalf(&grpwid./1.2)/%str(&&grp&_m)&split. (N=&&total&_m.)|
                    %end;
                    %if &outype=2 %then %do;
                        npct&_m/&&grp&_m&split. (N=&&total&_m.)&split. Patients (%str(%%))/&grpwid.|
                    %end;
                 %end;
                 %cntnue:
    ,format=
    ,breakvars=
    ,maxwidth=40,minwidth=5
    ,tflines=&tflines,fs=&fs.,Titlejust=&Titlejust,tabwp=&tabwp.,RptStyle=&RptStyle.,norecord=&norecord.);

    %if &debug=0 %then %do;
        proc datasets lib=work nolist nodetails;
        delete  lcr lcr_1 lcr_2  lcr_3 lcr_final _table _table_aecount _g1 _cal_n  _report_ ;
        quit;
    %end;
%exit:
%mend;

