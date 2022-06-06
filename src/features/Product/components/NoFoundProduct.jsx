import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';

export default function NoFoundProduct() {
  return (
    <Box padding="16px 16px 0">
      <Alert severity="warning">Rất tiêc. Không tìm thấy sản phẩm phù hợp !</Alert>
    </Box>
  );
}
