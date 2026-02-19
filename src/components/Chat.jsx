import React, { useState, useRef, useEffect } from "react";
import { Tooltip, IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  TextField,
  Button,
  List,
  ListItem,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import axios from "axios";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(
    localStorage.getItem("selectedModel") || "deepseek-r1:latest"
  );

  const listRef = useRef(null);

  // 🔹 Persistir modelo
  useEffect(() => {
    localStorage.setItem("selectedModel", model);
  }, [model]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/ia",
        {
          prompt: input,
          model: model, // 👈 agora envia valor real
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const botMessage = {
        role: "bot",
        content: response.data.result,
        model: model,
        source: response.data.source,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage = {
        role: "bot",
        content: "Erro ao obter resposta.",
        model: model,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const getModelLabel = (modelValue) => {
    if (modelValue === "deepseek-r1:latest") return "DeepSeek R1";
    if (modelValue === "llama3:latest") return "LLaMA 3";
    return modelValue;
  };

  const getSourceLabel = (sourceValue) => {
    if (sourceValue === "calculator_regex") return "Calculadora (Regex + AST)";
    if (sourceValue === "calculator_llm_parser") return "Calculadora (Parser via LLM)";
    if (sourceValue === "llm_direct") return "Resposta direta do LLM";
    if (sourceValue === "exchange_api") return "API de Câmbio (AwesomeAPI)";
    return sourceValue;
  };


  return (
    <Box sx={{ width: "100%" }}>
      {/* 🔹 Seletor */}
      <FormControl fullWidth sx={{ mb: 2 }} disabled={loading}>
        <InputLabel id="model-select-label">Modelo</InputLabel>
        <Select
          labelId="model-select-label"
          value={model}
          label="Modelo"
          onChange={(e) => setModel(e.target.value)}
        >
          <MenuItem value="deepseek-r1:latest">
            DeepSeek R1
          </MenuItem>
          <MenuItem value="llama3:latest">
            LLaMA 3
          </MenuItem>
        </Select>
      </FormControl>

      {/* 🔹 Mensagens */}
      <List
        ref={listRef}
        sx={{
          maxHeight: 400,
          overflowY: "auto",
          mb: 2,
          p: 1,
        }}
      >
        {messages.map((msg, idx) => (
          <ListItem
            key={idx}
            sx={{
              display: "flex",
              justifyContent:
                msg.role === "user" ? "flex-end" : "flex-start",
              py: 0.5,
            }}
          >
            <Box
              sx={{
                maxWidth: "70%",
                px: 2,
                py: 1,
                borderRadius: 2,
                bgcolor:
                  msg.role === "user" ? "#e0e0e0" : "#a0d8ff",
                color: "#000",
                wordBreak: "break-word",
              }}
            >
              <Typography variant="body1">
                {msg.content}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 0.5,
                }}
              >
                <Typography variant="caption">
                  {msg.role === "user" ? "Você" : "Artefact AI"}
                </Typography>

                {msg.role === "bot" && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Chip
                      label={getModelLabel(msg.model)}
                      size="small"
                      sx={{ height: 20, fontSize: 10 }}
                    />

                    {msg.source && (
                      <Tooltip title={getSourceLabel(msg.source)} arrow>
                        <IconButton size="small" sx={{ p: 0.5 }}>
                          <InfoOutlinedIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          </ListItem>
        ))}

        {loading && (
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              py: 0.5,
            }}
          >
            <Box
              sx={{
                maxWidth: "70%",
                px: 2,
                py: 1,
                borderRadius: 2,
                bgcolor: "#a0d8ff",
                fontStyle: "italic",
              }}
            >
              Artefact AI está digitando...
            </Box>
          </ListItem>
        )}
      </List>

      {/* 🔹 Input */}
      <Box display="flex" mt={1}>
        <TextField
          fullWidth
          variant="outlined"
          label="Digite sua mensagem"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <Button
          variant="contained"
          onClick={handleSend}
          disabled={loading}
          sx={{ ml: 1 }}
        >
          Enviar
        </Button>
      </Box>
    </Box>
  );
}

export default Chat;