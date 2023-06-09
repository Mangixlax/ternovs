<template>
  <main :class="$style['documents']">
    <section :class="$style['documents__grid']">
      <div :class="$style['documents__grid-container']">
        <div :class="$style['documents__grid-header']">
          <h1 :class="$style['documents-item__header-title']">
            Документы
          </h1>
          <p>
            В Авторской стоматологии Терновых мы уделяем большое внимание прозрачности нашей работы. Мы полностью
            осознаем важность доверия между врачом и пациентом, и поэтому гордимся тем, что можем поделиться с вами всей
            необходимой информацией о нашей клинике.
          </p>
          <p>
            Здесь вы можете ознакомиться с основными документами нашей клиники, включая лицензии, сертификаты и другие
            официальные документы, подтверждающие нашу аккредитацию и профессиональность.
          </p>
        </div>
        <div :class="$style['documents__grid-content']">
          <div v-for="(document, index) in documents" :key="index" :class="$style['documents__grid-document']">
            <svg-icon :name="`documents/${document.icon}`" />
            <div :class="$style['documents__grid-document-title']">
              {{ document.title }}
            </div>
            <div :class="$style['documents__grid-document-subtitle']"> {{ document.subtitle }}</div>
            <div :class="$style['documents__grid-document-link']">
              <span>Скачать</span>
              <svg-icon :name="'back-arrow'" />
            </div>
            <a :href="document.link" target="_blank"></a>
          </div>
        </div>
        <h2 :class="$style['documents-ids']">
          Индивидуально добровольное согласие
        </h2>
        <div :class="$style['documents__grid-content']">
          <div v-for="(document, index) in ids" :key="index" :class="$style['documents__grid-document']">
            <svg-icon :name="`documents/${document.icon}`" />
            <div :class="$style['documents__grid-document-title']">
              {{ document.title }}
            </div>
            <div :class="$style['documents__grid-document-subtitle']"> {{ document.subtitle }}</div>
            <div :class="$style['documents__grid-document-link']">
              <span>Скачать</span>
              <svg-icon :name="'back-arrow'" />
            </div>
            <a :href="document.link" download></a>
          </div>
        </div>
        <h2 :class="$style['documents-ids']">
          ИДС на детскую стоматологию
        </h2>
        <div :class="$style['documents__grid-content']">
          <div v-for="(document, index) in ids_detstvo" :key="index" :class="$style['documents__grid-document']">
            <svg-icon :name="`documents/${document.icon}`" />
            <div :class="$style['documents__grid-document-title']">
              {{ document.title }}
            </div>
            <div :class="$style['documents__grid-document-subtitle']"> {{ document.subtitle }}</div>
            <div :class="$style['documents__grid-document-link']">
              <span>Скачать</span>
              <svg-icon :name="'back-arrow'" />
            </div>
            <a :href="document.link" download></a>
          </div>
        </div>
        <h2 :class="$style['documents-ids']">
          Индивидуально добровольное согласие на манипуляции с кровью
        </h2>
        <div :class="$style['documents__grid-content']">
          <div v-for="(document, index) in ids_krov" :key="index" :class="$style['documents__grid-document']">
            <svg-icon :name="`documents/${document.icon}`" />
            <div :class="$style['documents__grid-document-title']">
              {{ document.title }}
            </div>
            <div :class="$style['documents__grid-document-subtitle']"> {{ document.subtitle }}</div>
            <div :class="$style['documents__grid-document-link']">
              <span>Скачать</span>
              <svg-icon :name="'back-arrow'" />
            </div>
            <a :href="document.link" download></a>
          </div>
        </div>
        <h2 :class="$style['documents-ids']">
          Индивидуально добровольное согласие на ортодонтическое лечение
        </h2>
        <div :class="$style['documents__grid-content']">
          <div v-for="(document, index) in ids_ortodontiya" :key="index" :class="$style['documents__grid-document']">
            <svg-icon :name="`documents/${document.icon}`" />
            <div :class="$style['documents__grid-document-title']">
              {{ document.title }}
            </div>
            <div :class="$style['documents__grid-document-subtitle']"> {{ document.subtitle }}</div>
            <div :class="$style['documents__grid-document-link']">
              <span>Скачать</span>
              <svg-icon :name="'back-arrow'" />
            </div>
            <a :href="document.link" download></a>
          </div>
        </div>
        <h2 :class="$style['documents-ids']">
          Индивидуально добровольное согласие на ортопедическое лечение
        </h2>
        <div :class="$style['documents__grid-content']">
          <div v-for="(document, index) in ids_ortopediya" :key="index" :class="$style['documents__grid-document']">
            <svg-icon :name="`documents/${document.icon}`" />
            <div :class="$style['documents__grid-document-title']">
              {{ document.title }}
            </div>
            <div :class="$style['documents__grid-document-subtitle']"> {{ document.subtitle }}</div>
            <div :class="$style['documents__grid-document-link']">
              <span>Скачать</span>
              <svg-icon :name="'back-arrow'" />
            </div>
            <a :href="document.link" download></a>
          </div>
        </div>
        <h2 :class="$style['documents-ids']">
          Индивидуально добровольное согласие на отказ от лечения
        </h2>
        <div :class="$style['documents__grid-content']">
          <div v-for="(document, index) in ids_otkazy" :key="index" :class="$style['documents__grid-document']">
            <svg-icon :name="`documents/${document.icon}`" />
            <div :class="$style['documents__grid-document-title']">
              {{ document.title }}
            </div>
            <div :class="$style['documents__grid-document-subtitle']"> {{ document.subtitle }}</div>
            <div :class="$style['documents__grid-document-link']">
              <span>Скачать</span>
              <svg-icon :name="'back-arrow'" />
            </div>
            <a :href="document.link" download></a>
          </div>
        </div>
        <h2 :class="$style['documents-ids']">
          Индивидуально добровольное согласие на пародонтологическое лечение
        </h2>
        <div :class="$style['documents__grid-content']">
          <div v-for="(document, index) in ids_parodontologiya" :key="index" :class="$style['documents__grid-document']">
            <svg-icon :name="`documents/${document.icon}`" />
            <div :class="$style['documents__grid-document-title']">
              {{ document.title }}
            </div>
            <div :class="$style['documents__grid-document-subtitle']"> {{ document.subtitle }}</div>
            <div :class="$style['documents__grid-document-link']">
              <span>Скачать</span>
              <svg-icon :name="'back-arrow'" />
            </div>
            <a :href="document.link" download></a>
          </div>
        </div>
        <h2 :class="$style['documents-ids']">
          Индивидуально добровольное согласие на терапевтическое лечение
        </h2>
        <div :class="$style['documents__grid-content']">
          <div v-for="(document, index) in ids_terapiya" :key="index" :class="$style['documents__grid-document']">
            <svg-icon :name="`documents/${document.icon}`" />
            <div :class="$style['documents__grid-document-title']">
              {{ document.title }}
            </div>
            <div :class="$style['documents__grid-document-subtitle']"> {{ document.subtitle }}</div>
            <div :class="$style['documents__grid-document-link']">
              <span>Скачать</span>
              <svg-icon :name="'back-arrow'" />
            </div>
            <a :href="document.link" download></a>
          </div>
        </div>
        <h2 :class="$style['documents-ids']">
          Индивидуально добровольное согласие на хирургическое лечение
        </h2>
        <div :class="$style['documents__grid-content']">
          <div v-for="(document, index) in ids_hirurgiya" :key="index" :class="$style['documents__grid-document']">
            <svg-icon :name="`documents/${document.icon}`" />
            <div :class="$style['documents__grid-document-title']">
              {{ document.title }}
            </div>
            <div :class="$style['documents__grid-document-subtitle']"> {{ document.subtitle }}</div>
            <div :class="$style['documents__grid-document-link']">
              <span>Скачать</span>
              <svg-icon :name="'back-arrow'" />
            </div>
            <a :href="document.link" download></a>
          </div>
        </div>
      </div>
    </section>
    <layout-callback />
  </main>
</template>
  
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { getHead } from '~/lib/utils'

import LayoutCallback from '@/components/Layout/LayoutCallback.vue'

export default defineComponent({
  name: 'BezopasnostIGarantii',
  components: {
    LayoutCallback,
  },
  data() {
    return {
      documents: [
        {
          icon: 'pdf',
          title: 'Лицензия',
          subtitle: 'Лицензия на проведение медицинской деятельности',
          link: '/documents/licensiya.pdf'
        },
        {
          icon: 'pdf',
          title: 'Анкета здоровья',
          subtitle: 'Небольшая анкета, необходима для выявления противопоказаний для Вас',
          link: '/documents/anketa-zdorovya.pdf'
        },
        {
          icon: 'pdf',
          title: 'Анкета здоровья ребенка',
          subtitle: 'Небольшая анкета, необходима для выявления противопоказаний для Вашего ребенка',
          link: '/documents/licensiya.pdf'
        },
        {
          icon: 'pdf',
          title: 'Заключение СЭЗ',
          subtitle: 'Санитарно-эпидемологическое заключение',
          link: '/documents/sez.pdf'
        }
      ],
      ids: [
        {
          icon: 'txt',
          title: 'ИДС Анестезия',
          subtitle: 'Информированное добровольное согласие на местное обезболивание стоматологического лечения',
          link: '/documents/ids/ids-anasteziya.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС комплекс обследований',
          subtitle: 'Информированное добровольное согласие пациента на комплекс обследований',
          link: '/documents/ids/ids-kompleks.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС на отбеливание зубов',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство по отбеливанию зубов',
          link: '/documents/ids/ids-otbelivanie.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС рентгендиагностика',
          subtitle: 'Условия проведения ренгенотологического обследования',
          link: '/documents/ids/ids-rentgen.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС период заболеваемости COVID-19',
          subtitle: 'Согласие на получение медицинской помощи по профилю «стоматология» в плановой форме в амбулаторных условиях в период повышенной заболеваемости населения новой коронавирусной инфекцией COVID-19',
          link: '/documents/ids/ids-covid.docx'
        },
        {
          icon: 'txt',
          title: 'Шаблон ИДС для любых случаев',
          subtitle: 'Информированное добровольное согласие пациента на проведение амбулаторного медицинского вмешательства',
          link: '/documents/ids/ids-lyboi.docx'
        }
      ],
      ids_detstvo: [
        {
          icon: 'txt',
          title: 'ИДС родителя',
          subtitle: 'Информированное согласие родителя (законного представителя) на проведение своему ребенку (подопечному) до 15 лет медицинского амбулаторного лечебного, диагностического вмешательства',
          link: '/documents/ids/ids-detstvo/ids-detstvo-obshee.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС на удаление временного зуба',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство Удаление временных (молочных) зубов',
          link: '/documents/ids/ids-detstvo/ids-vremenny-zub.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС на эндодонтическое лечение с несформированной верхушкой',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство - эндодонтическое лечение зубов с несформированной верхушкой корня с диагнозом «периодонтит»',
          link: '/documents/ids/ids-detstvo/ids-endodontiya.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС френулопластика вестибулопластика',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство в на хирургическую операцию по френулопластике или вестибулопластике',
          link: '/documents/ids/ids-detstvo/ids-frenuloplasikaa.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС на лечение кариеса и герметизацию фиссур детям',
          subtitle: 'Добровольное  информированное  согласие  на лечение  кариеса,  герметизацию  фиссур',
          link: '/documents/ids/ids-detstvo/ids-germitizaciya-fisur.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС на профессиональную гигиену детям',
          subtitle: 'Добровольное  информированное  согласие на  проведение  медицинского  вмешательства (профессиональная гигиена)',
          link: '/documents/ids/ids-detstvo/ids-detskaya-gigiena.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС на удаление зуба ребенку',
          subtitle: 'Добровольное  информированное  согласие на  удаление зуба ребенку',
          link: '/documents/ids/ids-detstvo/ids-udalenie-zuba-rebenku.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС на установку стандартной коронки ребенку',
          subtitle: 'добровольное  информированное  согласие на  установку  стандартной  коронки',
          link: '/documents/ids/ids-detstvo/ids-standartnaya-koronka-rebenku.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС на эндодонтическое лечение ребенка',
          subtitle: 'Добровольное  информированное  согласие на  проведение  медицинского  вмешательства (эндодонтическое лечение)',
          link: '/documents/ids/ids-detstvo/ids-endodontiya-rebenku.docx'
        }
      ],
      ids_krov: [
        {
          icon: 'txt',
          title: 'ИДС взятие крови из вены',
          subtitle: 'Информированное согласие на манипуляцию взятия крови из вены',
          link: '/documents/ids/krov/ids-krov.docx'
        },
      ],
      ids_ortodontiya: [
        {
          icon: 'txt',
          title: 'ИДС ортодонтия',
          subtitle: 'Информированное добровольное согласие пациента на проведение амбулаторного медицинского вмешательства на ортодонтическое лечение',
          link: '/documents/ids/ids-ortodontiya/ids-ortodontiya.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС Инвизилайн',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство (ортодонтическое лечение элайнерами Инвизилайн)',
          link: '/documents/ids/ids-ortodontiya/ids-inviziline.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС кондилография функциональный анализ',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство на функциональный анализ (кондилография)',
          link: '/documents/ids/ids-ortodontiya/ids-kondilografiya.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС многофункциональный анализ',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство - ортодонтический многофункциональный анализ',
          link: '/documents/ids/ids-ortodontiya/ids-mnogofunkcionalny-analiz.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС окклюзионная шина',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство с использованием окклюзионной шины (шинотерапия)',
          link: '/documents/ids/ids-ortodontiya/ids-okklyzionnaya-shina.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС ортодонтические микроимплантаты',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство с использованием ортодонтических микроимплантатов',
          link: '/documents/ids/ids-ortodontiya/ids-mikroimplanty.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС ортодонтия (детская)',
          subtitle: 'Информированное добровольное согласие на ортодонтическое лечение зубов ребенку',
          link: '/documents/ids/ids-ortodontiya/ids-ortodontiya-detskaya.docx'
        }
      ],
      ids_ortopediya: [
        {
          icon: 'txt',
          title: 'ИДС ортопедия',
          subtitle: 'Информированное добровольное согласие пациента на проведение медицинского вмешательства по протезированию зубов и зубных рядов',
          link: '/documents/ids/ids-ortopediya/ids-ortopediya.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС лечение зубов как временные опоры',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство - Лечение зубов, необходимых как временная опора до постоянного протезирования',
          link: '/documents/ids/ids-ortopediya/ids-vremennaya-opora.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС на ортопедическое лечение несъемное протезирование',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство - несъемные ортопедические конструкции ',
          link: '/documents/ids/ids-ortopediya/ids-nesemnie-ortopedicheskiye-knstrukcii.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС на ортопедическое лечение общее',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство - ортопедическое лечение',
          link: '/documents/ids/ids-ortopediya/ids-ortopediya-obshee.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС на ортопедическое лечение съемные протезы',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство - съемные ортопедические конструкции',
          link: '/documents/ids/ids-ortopediya/ids-semniye-ortopedisheskiye-konstrukcii.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС по протезированию витальных зубов',
          subtitle: 'Информированное добровольное согласие пациента на проведение медицинского вмешательства по протезированию витальных зубов',
          link: '/documents/ids/ids-ortopediya/ids-vitalnye-zuby.docx'
        },
      ],
      ids_otkazy: [
        {
          icon: 'txt',
          title: 'ИДС на лечение без покрытия коронкой',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство - дополнительное согласие к терапевтическому лечению зубов на отказ от покрытия зуба ортопедической конструкцией.',
          link: '/documents/ids/otkazy/ids-otkaz-ot-pokrytiya-koronkoi.docx'
        },
        {
          icon: 'txt',
          title: 'Форма Отказа от медицинского вмешательства',
          subtitle: 'Отказ от медицинского вмешательства',
          link: '/documents/ids/otkazy/ids-otkaz.docx'
        },
      ],
      ids_parodontologiya: [
        {
          icon: 'txt',
          title: 'ИДС на пародонтологическое лечение',
          subtitle: 'Информированное добровольное согласие на пародонтологическое лечение',
          link: '/documents/ids/ids-parodontologiya/ids-parodontologiya.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС оперативная пародонтология',
          subtitle: 'Информированное добровольное согласие на хирургическое лечение заболеваний пародонта',
          link: '/documents/ids/ids-parodontologiya/ids-operativnaya-parodontologiya.docx'
        },
      ],
      ids_terapiya: [
        {
          icon: 'txt',
          title: 'ИДС на терапевтическое лечение',
          subtitle: 'Информированное добровольное согласие на проведение терапевтического вмешательства',
          link: '/documents/ids/ids-terapiya/ids-na-provedenie-terapevticheskogo-vmeshatelstva.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС депульпирование зубов под коронки',
          subtitle: 'Информированное добровольное согласие на проведение медицинского вмешательства эндодонтическое лечение (лечение корневых каналов) в целях подготовки зубов к ортопедическому лечения',
          link: '/documents/ids/ids-terapiya/ids-depulpirovanie.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС лечение поверхностного и среднего кариеса',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство - лечение поверхностного и среднего кариеса',
          link: '/documents/ids/ids-terapiya/ids-lechenie-poverhostnogo-i-srednego-kariesa.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС лечение с сомнительным прогнозом',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство эндодонтическое лечение с сомнительным прогнозом',
          link: '/documents/ids/ids-terapiya/ids-lechenie-s-somnitelnim-progozom.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС на диагностическую ревизию зуба',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство диагностическая ревизия зуба (лечение с сомнительным прогнозом)',
          link: '/documents/ids/ids-terapiya/ids-reviziya-s-somnitelnim-prognozom.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС на лечение без покрытия коронкой',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство дополнительное согласие к терапевтическому лечению зубов на отказ от покрытия зуба ортопедической конструкцией.',
          link: '/documents/ids/ids-terapiya/ids-lechenie-bez-pokritiya-koronkoi.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС на лечение глубокого кариеса',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство - лечение глубокого кариеса',
          link: '/documents/ids/ids-terapiya/ids-lechenie-glubokogo-kariesa.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС на эндодонтическое лечение',
          subtitle: 'Информированное добровольное согласие на проведение медицинского вмешательства - эндодонтическое лечение',
          link: '/documents/ids/ids-terapiya/ids-endodonticheskoe-lechenie.docx'
        },
      ],
      ids_hirurgiya: [
        {
          icon: 'txt',
          title: 'ИДС на хирургическое лечение',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство - хирургическое лечение',
          link: '/documents/ids/ids-hirurgiya/ids-hirurgicheskoe-lechenie.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС аутотрансплантация зуба',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство: аутотрансплантацию постоянного зуба.',
          link: '/documents/ids/ids-hirurgiya/ids-autotransplantaciya.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС зубосохраняющие операции',
          subtitle: 'Информированное добровольное согласие на оказание медицинских услуг - зубосохраняющие (резекция верхушки корня, цистомия, гемисекция) операции',
          link: '/documents/ids/ids-hirurgiya/ids-zubosohranyaushie-operacii.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС Имплантация',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство - операция установки дентальных имплантатов, костная и мягкотканная пластика',
          link: '/documents/ids/ids-hirurgiya/ids-implantaciya.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС Имплантация ВСЕ на 4',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство - операция установки дентальных имплантатов и протезирования на них по технологии all-on-four (все на четырех)',
          link: '/documents/ids/ids-hirurgiya/ids-vse-na-4.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС Имплантация ВСЕ на 6',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство - Операция установки шести дентальных имплантатов и протезирования на них',
          link: '/documents/ids/ids-hirurgiya/ids-vse-na-6.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС на удаление зуба',
          subtitle: 'Информированное добровольное согласие на - удаление зуба(ов)',
          link: '/documents/ids/ids-hirurgiya/ids-udalenie-zuba.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС получение и применение тромбоцитарного сгустка',
          subtitle: 'Информированное согласие на манипуляцию получение и применение тромбоцитарного сгустка',
          link: '/documents/ids/ids-hirurgiya/ids-trombocitny-sgustok.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС реплантация зуба',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство на реплантацию зуба.',
          link: '/documents/ids/ids-hirurgiya/ids-replantaciya-zuba.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС репозиция зуба',
          subtitle: 'Информированное добровольное согласие на медицинское вмешательство на хирургическую репозицию зуба.',
          link: '/documents/ids/ids-hirurgiya/ids-repoziciya-zuba.docx'
        },
        {
          icon: 'txt',
          title: 'ИДС на костную пластику',
          subtitle: 'Информированное добровольное согласие на операцию по увеличению высоты (ширины) гребня альвеолярного отростка (для последующей имплантации)',
          link: '/documents/ids/ids-hirurgiya/ids-kostnaya-plastika.docx'
        },
      ],
    }
  },
  head() {
    return getHead({
      title: 'Документы - Авторская стоматология Терновых',
      description: 'В этом разделе вы найдете важные документы, связанные с нашей стоматологической клиникой. Ознакомьтесь с нашими лицензиями, сертификатами, политиками конфиденциальности и другими документами, чтобы быть уверенными в профессионализме и законности нашей работы.',
      route: this.$route,
    })
  },
  created() {
    this.$store.commit('setBreadCrumbs', [
      {
        name: 'Главная',
        route: {
          name: 'index',
        },
      },
      {
        name: 'Пациентам',
        route: {
          name: 'pacientam',
        },
      },
      {
        name: 'Документы',
        route: {
          name: 'pacientam-documenty',
        },
      },
    ])
  },
})
</script>
  
<style lang="scss" module>
.documents {
  width: 100%;
  padding: 80px 0;

  &__grid {
    @include grid-container;

    &-header {
      display: flex;
      flex-direction: column;
      grid-gap: 16px;
      margin-bottom: 32px;

      >h1 {
        @include font-h1-medium;
        margin: 0;
        margin: 8px 0 24px;
        color: $color-gray-100;
      }

      >p {
        @include font-p-regular-160;
        margin: 0;
      }
    }

    &-container {
      grid-column: 1 / 5;
    }

    &-content {
      display: grid;
      grid-template-columns: 1fr;
      grid-row-gap: 32px;
    }

    &-document {
      display: flex;
      flex-direction: column;
      grid-gap: 16px;
      position: relative;

      >svg {
        height: 80px;
        width: 80px;
        fill: $color-gray-100;
      }

      &-title {
        @include font-h6-medium;
        color: $color-gray-100;
        display: flex;

        >svg {
          height: 23px;
          width: 23px;
          fill: $color-primary-100;
          margin-left: 6px;
        }
      }

      &-subtitle {
        @include font-p-regular-160;
        margin: 0;
      }

      &-link {
        @include font-p-medium-160;
        display: flex;
        align-items: center;
        text-decoration: none;

        span {
          margin-top: 5px;
          color: $color-gray-100;
        }

        svg {
          height: 30px;
          width: 30px;
          fill: $color-primary-100;
        }
      }

      >a {
        position: absolute;
        inset: 0;
      }
    }
  }

  &-ids {
    @include font-h3-medium;
    margin: 32px 0;
  }

  @include media-breakpoint-up('md') {
    &__grid {
      &-container {
        grid-column: 1 / 9;
      }

      &-content {
        grid-template-columns: 1fr 1fr;
        grid-row-gap: 32px;
        grid-column-gap: 24px;
      }
    }
  }

  @include media-breakpoint-up('lg') {
    padding: 96px 48px;

    &__grid {
      &-container {
        grid-column: 1 / 11;
        padding: 0 96px;
      }

      &-content {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }

    &-ids {
      margin: 64px 0 48px;
    }
  }

  @include media-breakpoint-up('xl') {
    padding: 144px 72px;

    &__grid {
      &-header {
        >h1 {
          margin: 8px 0 32px;
        }
      }

      &-container {
        grid-column: 1 / 13;
      }
    }
  }
}
</style>
  