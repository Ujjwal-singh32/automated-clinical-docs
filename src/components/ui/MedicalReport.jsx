import React from "react";
import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Times-Roman',
    fontSize: 10,
    padding: 0,
    backgroundColor: '#f3f4f6',
    color: '#111827',
    lineHeight: 1.4,
  },
  container: {
    margin: 24,
    border: '1.5px solid #374151',
    borderRadius: 8,
    backgroundColor: '#fff',
    boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#111827',
    color: '#fff',
    padding: 20,
    borderBottom: '2px solid #374151',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 6,
    fontFamily: 'Times-Bold',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 2,
    textTransform: 'uppercase',
    color: '#111827',
    marginTop: 8,
    letterSpacing: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#4b5563',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 10,
    color: '#111827',
    fontWeight: 'medium',
  },
  divider: {
    borderBottom: '1px solid #d1d5db',
    marginVertical: 8,
  },
  section: {
    margin: 18,
    marginBottom: 0,
    paddingBottom: 0,
    backgroundColor: '#f9fafb',
    borderRadius: 6,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    padding: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionDesc: {
    fontSize: 9,
    color: '#4b5563',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderLeft: '3px solid #9ca3af',
    borderRadius: 4,
    paddingLeft: 8,
    paddingTop: 3,
    paddingBottom: 3,
    boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
  },
  listIndex: {
    width: 18,
    fontWeight: 'bold',
    color: '#2563eb',
    marginRight: 6,
    fontSize: 11,
    backgroundColor: '#e0e7ff',
    borderRadius: 4,
    textAlign: 'center',
    padding: 2,
  },
  listText: {
    fontSize: 10,
    color: '#111827',
    flex: 1,
    fontWeight: 'medium',
  },
  remarks: {
    fontStyle: 'italic',
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderLeft: '3px solid #2563eb',
    borderRadius: 6,
    marginTop: 6,
    color: '#374151',
    fontSize: 10,
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  sealBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    gap: 18,
  },
  seal: {
    fontSize: 10,
    color: '#374151',
    marginTop: 4,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  signature: {
    marginTop: 8,
    height: 60,
    objectFit: 'contain',
    alignSelf: 'center',
    borderRadius: 6,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  sealImgBox: {
    alignItems: 'center',
    backgroundColor: '#e0e7ff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 4,
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  sealImg: {
    height: 44,
    width: 44,
    objectFit: 'contain',
    borderRadius: 8,
    border: '1px solid #2563eb',
    backgroundColor: '#fff',
  },
  footer: {
    borderTop: '2px solid #374151',
    backgroundColor: '#e0e7ff',
    padding: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: 18,
    boxShadow: '0 -2px 8px rgba(0,0,0,0.04)',
  },
});


const MedicalReportPDF = ({ data }) => {
  if (!data) return null; // safety fallback

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{data.clinicName}</Text>
            <Text>{data.clinicAddress}</Text>
            <Text>{data.contact}</Text>
            <Text>Email: info@metromedical.org | www.metropolitanmedical.org</Text>
            <Text style={{ fontSize: 13, fontWeight: 'bold', marginTop: 10, letterSpacing: 1 }}>
              MEDICAL CONSULTATION REPORT
            </Text>
          </View>

          {/* Patient Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Patient Information</Text>
            <View style={styles.infoRow}><Text style={styles.label}>Attending Physician:</Text><Text style={styles.value}>{data.doctorName}</Text></View>
            <View style={styles.infoRow}><Text style={styles.label}>Date:</Text><Text style={styles.value}>{data.date}</Text></View>
            <View style={styles.infoRow}><Text style={styles.label}>Department:</Text><Text style={styles.value}>Internal Medicine</Text></View>
            <View style={styles.infoRow}><Text style={styles.label}>Medical License:</Text><Text style={styles.value}>MD-{Math.random().toString(36).substr(2, 6).toUpperCase()}</Text></View>
            <View style={styles.infoRow}><Text style={styles.label}>Patient Name:</Text><Text style={styles.value}>{data.patientName?.toUpperCase()}</Text></View>
            <View style={styles.infoRow}><Text style={styles.label}>Age:</Text><Text style={styles.value}>{data.age || '—'}</Text></View>
            <View style={styles.infoRow}><Text style={styles.label}>Gender:</Text><Text style={styles.value}>{data.gender || '—'}</Text></View>
            <View style={styles.infoRow}><Text style={styles.label}>Blood Type:</Text><Text style={styles.value}>{data.bloodType || '—'}</Text></View>
            <View style={styles.infoRow}><Text style={styles.label}>Weight:</Text><Text style={styles.value}>{data.weight || '—'}</Text></View>
            <View style={styles.infoRow}><Text style={styles.label}>Patient ID:</Text><Text style={styles.value}>PT-{Math.random().toString(36).substr(2, 6).toUpperCase()}</Text></View>
            <View style={styles.infoRow}><Text style={styles.label}>Contact:</Text><Text style={styles.value}>{data.patientContact || '—'}</Text></View>
          </View>

          {/* Symptoms */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chief Complaints & Presenting Symptoms</Text>
            <Text style={styles.sectionDesc}>As reported by patient during consultation</Text>
            {data.symptoms?.map((symptom, idx) => (
              <View style={styles.listItem} key={idx}>
                <Text style={styles.listIndex}>{idx + 1}.</Text>
                <Text style={styles.listText}>{symptom}</Text>
              </View>
            ))}
          </View>

          {/* Observations */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Clinical Examination & Observations</Text>
            <Text style={styles.sectionDesc}>Physical examination findings and vital signs</Text>
            {data.observations?.map((observation, idx) => (
              <View style={styles.listItem} key={idx}>
                <Text style={styles.listIndex}>{idx + 1}.</Text>
                <Text style={styles.listText}>{observation}</Text>
              </View>
            ))}
          </View>

          {/* Prescription */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Prescription & Treatment Protocol</Text>
            <Text style={styles.sectionDesc}>Prescribed medications and dosage instructions</Text>
            {data.prescription?.map((med, idx) => (
              <View style={styles.listItem} key={idx}>
                <Text style={styles.listIndex}>{idx + 1}.</Text>
                <Text style={styles.listText}>{med}</Text>
              </View>
            ))}
          </View>

          {/* Remarks */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Physician Notes & Clinical Remarks</Text>
            <Text style={styles.sectionDesc}>Additional observations and recommendations</Text>
            <View style={styles.remarks}>
              <Text>"{data.remarks || 'No remarks provided.'}"</Text>
            </View>
          </View>

          {/* Footer/Seal/Signature */}
          <View style={styles.footer}>
            <View style={styles.sealBox}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={styles.sectionTitle}>Official Medical Seal</Text>
                <View style={styles.sealImgBox}>
                  <Image style={styles.sealImg} src="/medical-seal.jpg" />
                </View>
                <Text style={styles.seal}>Valid only with official seal impression</Text>
                <Text style={styles.seal}>SEAL-{Math.random().toString(36).substr(2, 8).toUpperCase()}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.sectionTitle}>Physician Authorization</Text>
                <View style={styles.sealImgBox}>
                  <Image style={styles.signature} src="/signature.jpg" />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MedicalReportPDF;
