import React from 'react'
import { Box, TextField,  Typography } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

const monthes = [
  'грудня', 'січня', 'лютого', 
  'березня', 'квітня', 'травня',
  'червня', 'липня', 'серпня'
]

const Report = React.memo(({ report, reportRowChange }) => {

      const row = (elems) => <Box key={`row-${++count}`} display="flex"  flexDirection="row">{elems}</Box>
      const label = (text, error) => <Typography variant="h5"  key={++count} > {text} </Typography>
      
      const options = ({ label, value, error, model }) => {
      return (
            <Autocomplete
            value={value}
            key={`model-${++count}`}
            options={model}
            style={{padding: 3, width: "20vw"}}
            renderInput={(params) => <TextField  
                                    error={error !== null }
                                    helperText={error}
                                    margin="dense" 
                                    onChange={ e => {
                                          reportRowChange(label, e.target.value)
                                          e.target.style.color='darkolivegreen'
                                    }}
                                    label={label} 
                                    variant="outlined" {...params} />}
            />
      )
      }

      const tf = ({label, defVal, error, other}) =>  {
            let s = other && other.fullWidth ?  {padding: 3} : 
                                                {padding: 3, width: "fit-content"}
            return (
            <TextField  
            error={error !== null }
            helperText={error}
            key={`tf-${++count}`} 
            defaultValue={defVal}
            onChange={ e => {
                  reportRowChange(label, e.target.value)
                  e.target.style.color='darkolivegreen'
            }}
            margin="dense" style={s} 
            label={label} variant="outlined" {...other } />
            )
      }
      let count = 0;





    return (
        <>
          { label("НАЦІОНАЛЬНИЙ УНІВЕРСИТЕТ “КИЄВО-МОГИЛЯНСЬКА АКАДЕМІЯ”") }
          { label(`ЗАЛІКОВО-ЕКЗАМЕНАЦІЙНА ВІДОМІСТЬ № ${report.sheetCode}`, report.sheetCodeError )  }
          { row([ options({ label: "Освітній рівень", 
                          value: report.okr, 
                          error: report.okrError, 
                          model: ['Бакалавр', 'Магістр'] })]) }
          {
          row([
                options({ label: "Факультет", 
                          value: report.faculty, 
                          error: report.facultyError, 
                          model: ['інформатики', 'фізики'] }),

                options({ label: "Рік навчання", 
                          value: report.eduYear, 
                          error: report.eduYearError,
                          model: ['1', '2', '3', '4', '5', '6'] }) ,

                tf({label: 'Група', defVal: report.group, erro: report.groupError})
          ])
          }
          { row( [ tf({ label: "Дисципліна", 
                        defVal: report.subject, 
                        error: report.subjectError,
                        other: {fullWidth: true}})] ) }
          {
          row([
                options({ label: "Семестр", 
                          value: report.term, 
                          error: report.termError,
                          model: ['1', '2', '3', '4', '4д'] }),

                tf({ label: 'Залікові бали', 
                     defVal: report.creditPoints, 
                     error: report.creditPointsError, 
                     other: {type:'number'}})
          ]) 
         }
          {
          row([
                options({ label: "Форма контролю", 
                          value: report.controlForm, 
                          error: report.controlFormError,
                          model: ['залік', 'іспит','екзамен'] }),
                row([
                      tf({  label: 'День', 
                            defVal: report.date.day, 
                            error: report.dateError,
                            other: {type: 'number' }}),

                      options({ label: "Місяць", 
                                value: report.date.month, 
                                error: report.dateError,
                                model: monthes }), 

                      tf({ label: 'Рік', 
                           defVal: report.date.year, 
                           error: report.dateError,
                           other: { type: 'number' }})
                ])
          ])
        } 
        { 
        row([
          tf({  label: 'Прізвище, ім’я, по батькові екзаменатора', 
                defVal: report.teacherName, 
                error: report.teacherNameError,
                other: {fullWidth: true}}),

          tf({  label: 'Вчене звання', 
                defVal: report.teacherRank.join(', '),  
                error: report.teacherRankError,
                other: { fullWidth: true}})
        ])
        }  
        </>
    )
})

export default Report
