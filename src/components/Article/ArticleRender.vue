<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import paragraph from '~/components/Article/content/ContentParagraph.vue'
import header from '~/components/Article/content/ContentHeader.vue'
import delimiter from '~/components/Article/content/ContentDivider.vue'
import image from '~/components/Article/content/ContentImage.vue'
import embed from '~/components/Article/content/ContentEmbed.vue'
import code from '~/components/Article/content/ContentCode.vue'
import list from '~/components/Article/content/ContentList.vue'
import linkTool from '~/components/Article/content/ContentLinkTool.vue'
import table from '~/components/Article/content/ContentTable.vue'

export default defineComponent({
  functional: true,
  props: {
    block: {
      type: Object,
      default: () => ({}),
    },
    index: {
      type: [String, Number],
      default: '',
    },
  },
  // @ts-ignore
  inject: {
    components: {
      default: {
        paragraph,
        header,
        delimiter,
        image,
        embed,
        code,
        list,
        linkTool,
        table,
      },
    },
  },
  render(createElement, context) {
    if (context.props.block) {
      return Object.keys(context.injections.components).includes(
        context.props.block.type
      )
        ? createElement(
            context.injections.components[context.props.block.type],
            {
              attrs: {
                ...context.data.attrs,
                ...(context.props.block.type === 'header' &&
                String(context.props.index).length > 0
                  ? { id: `ahead_${context.props.index}` }
                  : {}),
              },
              class: context.data.class,
              props: {
                block: context.props.block,
                index: context.props.index,
              },
            }
          )
        : null
    }

    return null
  },
})
</script>
