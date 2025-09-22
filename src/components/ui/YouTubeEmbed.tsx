interface Props {
  videoKey: string
  title: string
}

const YouTubeEmbed: React.FC<Props> = ({videoKey, title}) => {
  if (!videoKey) {
    return null;
  }

  const embedUrl = `https://www.youtube.com/embed/${videoKey}?autoplay=0`; // 可以添加 ?autoplay=1 等參數

  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: '56.25%', /* 16:9 比例 */
        height: 0,
        overflow: 'hidden',
        maxWidth: '100%',
        background: '#000',
      }}
    >
      <iframe
        width="100%"
        height="100%"
        src={embedUrl}
        title={title || "YouTube video player"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default YouTubeEmbed;
