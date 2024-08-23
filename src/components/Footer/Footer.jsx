import { Container, Text } from '@mantine/core';
import classes from './Footer.module.css';

export function Footer() {
  return (
    <div>
      <Container className={classes.footer}>
      <Text c="dimmed" size="sm">
          © 2021 abc ltd.
        </Text>
      </Container>
    </div>
  );
}